# -*- coding: utf-8 -*-
"""Evaluation_LH.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1kcxm_XDHA8mLxmF7mmKpFi8jpZwmQ-JU
"""

import numpy as np
import sys 

hola=sys.argv[1]
hola=hola.split(',')

Trainee_leftLeg_Sim_Actions0= list()

for x in hola:
    Trainee_leftLeg_Sim_Actions0.append(int(x))

#Trainee_leftLeg_Sim_Actions0=sys.argv[1]
#pasar a lista phyton lo que me llega



"NEEDLEMAN-WUNSCH GLOBAL ALIGNMENT ALGORITHM PERSONALIZED"

def GlobalAlignment(matchReward,swapPenalty,contrPenalty,mismatchPenalty,gapPenalty,seq1,seq2):


    g1=[7,37,32]
    g2=[28,48,49]
    g3=[35,52]
    g4=[8,42]
    g5=[53,54]
    g6=[50,51]
    g7=[25,66]
    g8=[40,28,48,49,12,68,69,70,131,71]

    def constructEmptyMatrix(cols, rows):
        M = []
        for columnIndex in range(cols):
            M.append([])
        for columnIndex in range(cols):
            for rowIndex in range(rows):
                M[columnIndex].append(None)
        return M

    def calculateMaximumScore(isMatched, isSwapped, isContr,upScore, leftScore, diagonalScore , matchReward, matchSwap, mismatchPenalty, gapPenalty):
        maxScore = -99
        path = None 

        if (isMatched):
            matchingResult = diagonalScore+matchReward 
            if matchingResult>maxScore:
                maxScore = matchingResult
                path = 'match'
        elif (isSwapped):
            matchingResult = diagonalScore+swapPenalty 
            if matchingResult>maxScore:
                maxScore = matchingResult
                path = 'match'     
        elif (isContr):
            matchingResult = diagonalScore+contrPenalty 
            if matchingResult>maxScore:
                maxScore = matchingResult
                path = 'match' 
        else:
            mismatchingResult = diagonalScore+mismatchPenalty
            if mismatchingResult>maxScore:
                maxScore = mismatchingResult
                path = 'mismatch'

        upGapResult = upScore+gapPenalty
        if upGapResult>maxScore:
            maxScore = upGapResult
            path = 'vertical'
        leftGapResult = leftScore+gapPenalty
        if leftGapResult>maxScore:
            maxScore = leftGapResult
            path = 'horizontal'

        return maxScore, path

    def extractPath(path):
        extractedPath = []
        currentCell = path[0]['current']
        nextCell = path[0]['previous']
        extractedPath.append(currentCell)
        for index in range(1, len(path)):
            if nextCell == path[index]['current']:
                currentCell = path[index]['current']
                nextCell = path[index]['previous']
                extractedPath.append(currentCell) 
        return extractedPath        

    def fillNeedlemanMatrix(M, seq1, seq2,matchReward, swapPenalty, contrPenalty,mismatchPenalty, gapPenalty):
        solutionPath = []
        for x in range(min(len(seq1),len(seq2))):
    #        for y in range(len(seq2)):
    #            print("from Sequence 1: ", seq1[x])
    #            print("from Sequence 2: ", seq2[y])
                y=x
                isMatched = True if seq1[x]==seq2[y] else False
    #            print("Is Matched: ", isMatched)

                isSwapped= True if ((seq1[x]==g1[0] and (seq2[y]==g1[1] or seq2[y]==g1[2]))
                                   or (seq1[x]==g2[0] and (seq2[y]==g2[1] or seq2[y]==g2[2]))
                                   or (seq1[x]==g3[0] and seq2[y]==g3[1])
                                   or (seq1[x]==g4[0] and seq2[y]==g4[1])
                                   or (seq1[x]==g5[0] and seq2[y]==g5[1])
                                   or (seq1[x]==g6[0] and seq2[y]==g6[1])) else False

    #            print("Is isSwapped: ", isSwapped)

                isContr= True if ((seq1[x]==g7[0] and (seq2[y]==g8[0] or seq2[y]==g8[1] or seq2[y]==g8[2]
                                or seq2[y]==g8[3] or seq2[y]==g8[4] or seq2[y]==g8[5] or seq2[y]==g8[6]
                                or seq2[y]==g8[7] or seq2[y]==g8[8] or seq2[y]==g8[9]))
                                or (seq1[x]==g7[1] and (seq2[y]==g8[0] or seq2[y]==g8[1] or seq2[y]==g8[2]
                                or seq2[y]==g8[3] or seq2[y]==g8[4] or seq2[y]==g8[5] or seq2[y]==g8[6]
                                or seq2[y]==g8[7] or seq2[y]==g8[8] or seq2[y]==g8[9]))) else False
    #            print("Is isContr: ", isContr)

                upScore, leftScore, diagonalScore = -99,-99,-99
                if y-1>=0:
                    upScore = M[x][y-1] if M[x][y-1]!= None else -99
                if x-1>=0:
                    leftScore = M[x-1][y] if M[x-1][y]!= None else -99
                if x-1>=0 and y-1>=0:
                    diagonalScore = M[x-1][y-1] if M[x-1][y-1]!= None else -99
    #             print("upScore: ", upScore)
    #             print("leftScore: ", leftScore)
    #             print("diagonalScore: ", diagonalScore)

                score, path = calculateMaximumScore(isMatched, isSwapped, isContr, upScore, leftScore, diagonalScore,
                                                    matchReward, swapPenalty, mismatchPenalty, gapPenalty)
                if x == 0 and y==0:
                    score = 0
    #             print(f"Adjusting M[{x}][{y}] to {score}")
    #             print(f"Path was: {path}")
    #             print("--------------")
                M[x][y] = score

                step = {
                    'current':[], 
                    'previous':[]
                }
                step['current'] =  [x,y]
                # This constructs a step (previous[x,y], current[x,y])
                if path == 'vertical':
                    step['previous']= [x,y-1]
                if path == 'horizontal':
                    step['previous']= [x-1,y]
                if path == 'match' or path == 'mismatch':
                    step['previous']= [x-1,y-1]
                solutionPath.append(step) 

        return M, solutionPath

    def extractOptimalAllignment(seq1, seq2, optimalSolutionPath):
        optimal_seq1=[]
        optimal_seq2=[]

        index_seq1 = optimalSolutionPath[0][0]
        index_seq2 = optimalSolutionPath[0][1]

        for index in range(len(optimalSolutionPath)):
            # Stopping condition: The last node is reached, and shall be appended regardless
            if index+1 not in range(len(optimalSolutionPath)):
                break
            currentCell = optimalSolutionPath[index]
            previousCell = optimalSolutionPath[index+1]

            # Vertical Gap: Same X-coordinate
            if currentCell[0] == previousCell[0]:
                optimal_seq1.append('_')
                optimal_seq2.append(seq2[index_seq2])
                index_seq2 -=1
            # Horizontal Gap: Same Y-Coordinate
            elif currentCell[1] == previousCell[1]:
                optimal_seq1.append(seq1[index_seq1])
                optimal_seq2.append('_')            
                index_seq1 -=1
            else: 
                optimal_seq1.append(seq1[index_seq1])
                optimal_seq2.append(seq2[index_seq2])
                index_seq1 -=1
                index_seq2 -=1

        optimal_seq1.reverse()
        optimal_seq2.reverse()
        return optimal_seq1, optimal_seq2

    #seq1 = np.array([8,7,3,2,4,1,25])
    #seq2 = np.array([1,37,8,5,7,6,3,2,131])

    #Sequences to List 
    seq1_list = ['j']+(list(seq1))
    seq2_list = ['i']+(list(seq2))

    Matrix = constructEmptyMatrix(len(seq1_list), len(seq2_list))
    resultMatrix, allPossiblePaths = fillNeedlemanMatrix(Matrix, seq1_list, seq2_list, matchReward, swapPenalty, contrPenalty,mismatchPenalty, gapPenalty)
    reversedPossiblePaths = list(reversed(allPossiblePaths))
    optimalSolutionPath = extractPath(reversedPossiblePaths)
    #print("Optimal Allignment Path is: ", optimalSolutionPath)

    optimal_seq1, optimal_seq2 = extractOptimalAllignment(seq1_list, seq2_list, optimalSolutionPath)

    matches=[]
    for i,j in zip(optimal_seq1,optimal_seq2):
        if i==j:
            matches.append(i)
    
    print(str(len(matches)))

    swap=[]
    for i,j in zip(optimal_seq1,optimal_seq2):
        if ((i == g1[0] and (j == g1[1] or j == g1[2])) 
            or (i == g2[0] and (j == g2[1] or j == g2[2])) 
            or (i == g3[0] and j == g3[1]) 
            or (i == g4[0] and j == g4[1]) 
            or (i == g5[0] and j == g5[1]) 
            or (i == g6[0] and j == g6[1])):
            swap.append(i)
   
    print(str(len(swap)))

    contr=[]
    for i,j in zip(optimal_seq1,optimal_seq2):
        if ((i == g7[0] and (j==g8[0] or j==g8[1] or j==g8[2] or j==g8[3] or j==g8[4] or j==g8[5]
                           or j==g8[6] or j==g8[7] or j==g8[8] or j==g8[9])) 
            or (i == g7[1] and (j==g8[0] or j==g8[1] or j==g8[2] or j==g8[3] or j==g8[4] or j==g8[5]
                           or j==g8[6] or j==g8[7] or j==g8[8] or j==g8[9]))):
            contr.append(i)
    
    print(str(len(contr))) 

    gaps1=optimal_seq1.count('_')
    gaps2=optimal_seq2.count('_')
    gaps=gaps1+gaps2
    
    print(str(gaps))

    mismatches=[]
    for i,j in zip(optimal_seq1,optimal_seq2):
        if ( i!= j and (i !='_' and j != '_')):
            mismatches.append(i)
    
    print(str(len(mismatches)))

    puntuación=len(matches)*matchReward+gaps*gapPenalty+len(mismatches)*mismatchPenalty+len(swap)*swapPenalty+len(contr)*contrPenalty
    #print('GA:'+str(puntuación))
    return puntuación

##Trainee_Pelvis_Sim_Action es el listado de acciones que cogemos del simulador para cada simulación
##escenario_select es el escenario ideal con el que se compara que viene de un listado para cada fase y parte del cuerpo

AccleftLeg1H=[7,29,30,19,25,129,35,50,52,53,51,54,48,28,42,130,78,70,69,67,65,66,68,71,16,132] # acciones que debería haber hecho en los primeros 4 min
AccleftLeg2H=[32,29,30,19,25,129,35,50,52,53,51,54,48,28,42,130,78,70,69,67,65,66,68,71,16,132] # acciones que debería haber hecho en los primeros 4 min
AccleftLeg3H=[37,29,30,19,25,129,35,50,52,53,51,54,48,28,42,130,78,70,69,67,65,66,68,71,16,132] # acciones que debería haber hecho en los primeros 4 min
AccleftLeg4H=[7,30,29,19,25,129,35,50,52,53,51,54,48,28,42,130,78,70,69,67,65,66,68,71,16,132] # acciones que debería haber hecho en los primeros 4 min
AccleftLeg5H=[32,30,29,19,25,129,35,50,52,53,51,54,48,28,42,130,78,70,69,67,65,66,68,71,16,132] # acciones que debería haber hecho en los primeros 4 min
AccleftLeg6H=[37,30,29,19,25,129,35,50,52,53,51,54,48,28,42,130,78,70,69,67,65,66,68,71,16,132] # acciones que debería haber hecho en los primeros 4 min
AccleftLeg7H=[7,29,30,19,25,129,35,50,52,53,51,54,48,28,42,130,70,69,67,65,66,68,71,78,16,132] # acciones que debería haber hecho en los primeros 4 min
AccleftLeg8H=[32,29,30,19,25,129,35,50,52,53,51,54,48,28,42,130,70,69,67,65,66,68,71,78,16,132] # acciones que debería haber hecho en los primeros 4 min
AccleftLeg9H=[37,29,30,19,25,129,35,50,52,53,51,54,48,28,42,130,70,69,67,65,66,68,71,78,16,132] # acciones que debería haber hecho en los primeros 4 min
AccleftLeg10H=[7,30,29,19,25,129,35,50,52,53,51,54,48,28,42,130,70,69,67,65,66,68,71,78,16,132] # acciones que debería haber hecho en los primeros 4 min
AccleftLeg11H=[32,30,29,19,25,129,35,50,52,53,51,54,48,28,42,130,70,69,67,65,66,68,71,78,16,132] # acciones que debería haber hecho en los primeros 4 min
AccleftLeg12H=[37,30,29,19,25,129,35,50,52,53,51,54,48,28,42,130,70,69,67,65,66,68,71,78,16,132] # acciones que debería haber hecho en los primeros 4 min
AccleftLeg13H=[7,35,30,19,25,129,29,50,52,53,51,54,48,28,42,130,78,70,69,67,65,66,68,71,16,132] # acciones que debería haber hecho en los primeros 4 min
AccleftLeg14H=[32,35,30,19,25,129,29,50,52,53,51,54,48,28,42,130,78,70,69,67,65,66,68,71,16,132] # acciones que debería haber hecho en los primeros 4 min
AccleftLeg15H=[37,35,30,19,25,129,29,50,52,53,51,54,48,28,42,130,78,70,69,67,65,66,68,71,16,132] # acciones que debería haber hecho en los primeros 4 min
AccleftLeg16H=[7,30,35,19,25,129,29,50,52,53,51,54,48,28,42,130,78,70,69,67,65,66,68,71,16,132] # acciones que debería haber hecho en los primeros 4 min
AccleftLeg17H=[32,30,35,19,25,129,29,50,52,53,51,54,48,28,42,130,78,70,69,67,65,66,68,71,16,132] # acciones que debería haber hecho en los primeros 4 min
AccleftLeg18H=[37,30,35,19,25,129,29,50,52,53,51,54,48,28,42,130,78,70,69,67,65,66,68,71,16,132] # acciones que debería haber hecho en los primeros 4 min
AccleftLeg19H=[7,35,30,19,25,129,29,50,52,53,51,54,48,28,42,130,70,69,67,65,66,68,71,78,16,132] # acciones que debería haber hecho en los primeros 4 min
AccleftLeg20H=[32,35,30,19,25,129,29,50,52,53,51,54,48,28,42,130,70,69,67,65,66,68,71,78,16,132] # acciones que debería haber hecho en los primeros 4 min
AccleftLeg21H=[37,35,30,19,25,129,29,50,52,53,51,54,48,28,42,130,70,69,67,65,66,68,71,78,16,132] # acciones que debería haber hecho en los primeros 4 min
AccleftLeg22H=[7,30,35,19,25,129,29,50,52,53,51,54,48,28,42,130,70,69,67,65,66,68,71,78,16,132] # acciones que debería haber hecho en los primeros 4 min
AccleftLeg23H=[32,30,35,19,25,129,29,50,52,53,51,54,48,28,42,130,70,69,67,65,66,68,71,78,16,132] # acciones que debería haber hecho en los primeros 4 min
AccleftLeg24H=[37,30,35,19,25,129,29,50,52,53,51,54,48,28,42,130,70,69,67,65,66,68,71,78,16,132] # acciones que debería haber hecho en los primeros 4 min


AccleftLeg25H=[7,29,30,19,50,52,51,48,28,42,130,78,70,69,67,65,16,132] # acciones que debería haber hecho en los primeros 4 min
AccleftLeg26H=[32,29,30,19,50,52,51,48,28,42,130,78,70,69,67,65,16,132] # acciones que debería haber hecho en los primeros 4 min
AccleftLeg27H=[37,29,30,19,50,52,51,48,28,42,130,78,70,69,67,65,16,132] # acciones que debería haber hecho en los primeros 4 min
AccleftLeg28H=[7,30,29,19,50,52,51,48,28,42,130,78,70,69,67,65,16,132] # acciones que debería haber hecho en los primeros 4 min
AccleftLeg29H=[32,30,29,19,50,52,51,48,28,42,130,78,70,69,67,65,16,132] # acciones que debería haber hecho en los primeros 4 min
AccleftLeg30H=[37,30,29,19,50,52,51,48,28,42,130,78,70,69,67,65,16,132] # acciones que debería haber hecho en los primeros 4 min
AccleftLeg31H=[7,29,30,19,50,52,51,48,28,42,130,70,69,67,65,78,16,132] # acciones que debería haber hecho en los primeros 4 min
AccleftLeg32H=[32,29,30,19,50,52,51,48,28,42,130,70,69,67,65,8,16,132] # acciones que debería haber hecho en los primeros 4 min
AccleftLeg33H=[37,29,30,19,50,52,51,48,28,42,130,70,69,67,65,78,16,132] # acciones que debería haber hecho en los primeros 4 min
AccleftLeg34H=[7,30,29,19,50,52,51,48,28,42,130,70,69,67,65,78,16,132] # acciones que debería haber hecho en los primeros 4 min
AccleftLeg35H=[32,30,29,19,50,52,51,48,28,42,130,70,69,67,65,78,16,132] # acciones que debería haber hecho en los primeros 4 min
AccleftLeg36H=[37,30,29,19,50,52,51,48,28,42,130,70,69,67,65,78,16,132] # acciones que debería haber hecho en los primeros 4 min
AccleftLeg37H=[7,30,19,29,50,52,51,48,28,42,130,78,70,69,67,65,16,132] # acciones que debería haber hecho en los primeros 4 min
AccleftLeg38H=[32,30,19,29,50,52,51,48,28,42,130,78,70,69,67,65,16,132] # acciones que debería haber hecho en los primeros 4 min
AccleftLeg39H=[37,30,19,29,50,52,51,48,28,42,130,78,70,69,67,65,16,132] # acciones que debería haber hecho en los primeros 4 min
AccleftLeg40H=[7,30,19,29,50,52,51,48,28,42,130,78,70,69,67,65,16,132] # acciones que debería haber hecho en los primeros 4 min
AccleftLeg41H=[32,30,19,29,50,52,51,48,28,42,130,78,70,69,67,65,16,132] # acciones que debería haber hecho en los primeros 4 min
AccleftLeg42H=[37,30,19,29,50,52,51,48,28,42,130,78,70,69,67,65,16,132] # acciones que debería haber hecho en los primeros 4 min
AccleftLeg43H=[7,30,19,29,50,52,51,48,28,42,130,70,69,67,65,78,16,132] # acciones que debería haber hecho en los primeros 4 min
AccleftLeg44H=[32,30,19,29,50,52,51,48,28,42,130,70,69,67,65,78,16,132] # acciones que debería haber hecho en los primeros 4 min
AccleftLeg45H=[37,30,19,29,50,52,51,48,28,42,130,70,69,67,65,78,16,132] # acciones que debería haber hecho en los primeros 4 min
AccleftLeg46H=[7,30,19,29,50,52,51,48,28,42,130,70,69,67,65,78,16,132] # acciones que debería haber hecho en los primeros 4 min
AccleftLeg47H=[32,30,19,29,50,52,51,48,28,42,130,70,69,67,65,78,16,132] # acciones que debería haber hecho en los primeros 4 min
AccleftLeg48H=[37,30,19,29,50,52,51,48,28,42,130,70,69,67,65,78,16,132] # acciones que debería haber hecho en los primeros 4 min

lista_esc_leftLeg_H=[AccleftLeg1H,AccleftLeg2H,AccleftLeg3H,AccleftLeg4H,AccleftLeg5H,AccleftLeg6H,AccleftLeg7H,
                     AccleftLeg8H,AccleftLeg9H,AccleftLeg10H,AccleftLeg11H,AccleftLeg12H,AccleftLeg13H,
                     AccleftLeg14H,AccleftLeg15H,AccleftLeg16H,AccleftLeg17H,AccleftLeg18H,AccleftLeg19H,
                     AccleftLeg20H,AccleftLeg21H,AccleftLeg22H,AccleftLeg23H,AccleftLeg24H,
                     AccleftLeg25H,AccleftLeg26H,AccleftLeg27H,AccleftLeg28H,AccleftLeg29H,AccleftLeg30H,AccleftLeg31H,
                     AccleftLeg32H,AccleftLeg33H,AccleftLeg34H,AccleftLeg35H,AccleftLeg36H,AccleftLeg37H,
                     AccleftLeg38H,AccleftLeg39H,AccleftLeg40H,AccleftLeg41H,AccleftLeg42H,AccleftLeg43H,
                     AccleftLeg44H,AccleftLeg45H,AccleftLeg46H,AccleftLeg47H,AccleftLeg48H]

#Trainee_leftLeg_Sim_Actions0=[7,28,42,16,132,63,53,52]                    
lista_aciertos=[]
for esc in lista_esc_leftLeg_H:
    min_length=min(len(Trainee_leftLeg_Sim_Actions0),len(esc))
    aciertos=esc[:min_length]==Trainee_leftLeg_Sim_Actions0[:min_length]
    suma_aciertos=np.sum(aciertos)
    lista_aciertos.append(suma_aciertos)
escenario_select=lista_esc_leftLeg_H[np.argmax(lista_aciertos)]
GA=GlobalAlignment(10,8,-4,-2,-1,Trainee_leftLeg_Sim_Actions0,escenario_select)/(min(len(escenario_select),len(Trainee_leftLeg_Sim_Actions0))*10)
#GA=GlobalAlignment(10,5,-10,-5,-2,Trainee_leftLeg_Sim_Actions0,escenario_select)/(min(len(escenario_select),len(Trainee_leftLeg_Sim_Actions0))*10)
#GA=GlobalAlignment(20,10,-10,-5,0,Trainee_leftLeg_Sim_Actions0,escenario_select)/(min(len(escenario_select),len(Trainee_leftLeg_Sim_Actions0))*10)

print(str(GA))
#print(Trainee_Pelvis_Sim_Actions)
Trainee_leftLeg_Sim_Actions_Common0=set(Trainee_leftLeg_Sim_Actions0)&set(escenario_select)
#print(Trainee_leftLeg_Sim_Actions_Common0)
#print('TP:'+ str(len(Trainee_leftLeg_Sim_Actions_Common0)))
#print('FN:' + str(len(AccleftLeg0)-len(Trainee_leftLeg_Sim_Actions_Common0)))
Acc4MinNo=[32,72] # acciones que no deberían haber hacer
Trainee_leftLeg_Sim_Actions_Wrong=set(Trainee_leftLeg_Sim_Actions0)&set(Acc4MinNo)
#print(Trainee_Pelvis_Sim_Actions_Wrong)
#print('FP:'+ str(len(Trainee_leftLeg_Sim_Actions_Wrong)))
#print('TN:' + str(len(AccleftLeg0)-len(Trainee_leftLeg_Sim_Actions_Wrong)))
TP=len(Trainee_leftLeg_Sim_Actions_Common0)#acciones hechas que deberían haberse hecho
FN=len(escenario_select)-len(Trainee_leftLeg_Sim_Actions_Common0)#acciones que deberían haber hecho pero no han hecho
FP=len(Trainee_leftLeg_Sim_Actions_Wrong)#acciones que no deberían haberse hecho y se han hecho
TN=len(Acc4MinNo)-len(Trainee_leftLeg_Sim_Actions_Wrong)#acciones que no deberían haberse hecho y no se han hecho
Precision=TP/(TP+FP) if (TP+FP)!=0 else 0 #porcentaje de predicciones positivas correctas; acciones bien hechas de las hechas
Recall=TP/(TP+FN)  if (TP+FN)!=0 else 0#porcentaje de casos positivos detectados; acciones de debían hacer y han hecho
Specificity=TN/(TN+FP) if (TN+FP)!=0 else 0#porcentaje de casos negativos detectados; acciones que no debían hacer y no han hecho
Accuracy=(TP+TN)/(TP+TN+FP+FN) #porcentaje de predicciones correctas
F1=2*((Precision*Recall)/(Precision+Recall)) if (Precision+Recall)!=0 else 0
sequenceMatrix = np.zeros((np.size(Trainee_leftLeg_Sim_Actions0), np.size(escenario_select)))
#Populate matrix with 1s in case of coincidence 
for i, val_mask in enumerate(Trainee_leftLeg_Sim_Actions0):
    for j, val_trial in enumerate(escenario_select):
        if val_mask == val_trial:
            sequenceMatrix[i,j] = 1

        #Calc Diagonals
sumMatrix = 0;
for i in np.arange(-np.size(Trainee_leftLeg_Sim_Actions0),np.size(escenario_select)):
    sumMatrix += np.trace(sequenceMatrix, offset=i) ** 2
        
aa=min(len(Trainee_leftLeg_Sim_Actions0),len(escenario_select))
bb=max(len(Trainee_leftLeg_Sim_Actions0),len(escenario_select))
ent=bb // aa
res=bb % aa
puntuaciónMax=(ent* ((aa)**2 + res**2))
SimilarDiagonalScore=(sumMatrix/puntuaciónMax)
visitedMatrix = np.zeros((len(Trainee_leftLeg_Sim_Actions0),len(escenario_select)), dtype=int)
val1=[]
for i, val_mask in enumerate(Trainee_leftLeg_Sim_Actions0):
    for j, val_trial in enumerate(escenario_select):
        index = 1
        tmp = []
        
        if i<(len(Trainee_leftLeg_Sim_Actions0)-1) and j<(len(escenario_select)-1) and visitedMatrix[(i,j)]==0:
            while (sequenceMatrix[i,j]==1 and sequenceMatrix[i+index,j+index]==1):
                if len(tmp)==0 :
                    tmp.append(val_mask)
                #tmp.append(i)
                tmp.append(Trainee_leftLeg_Sim_Actions0[i+index])
                #tmp.append(i+index)
                #print('secuencia',tmp)
                visitedMatrix[(i+index,j+index)]=1
                index += 1
                #print(i + index)
                if (i+index)>(len(Trainee_leftLeg_Sim_Actions0)-1) or (j+index)>(len(escenario_select)-1):
                #val1.append(tmp)
                    break
        if (len(tmp)!=0):
            val1.append(tmp)
    visitedMatrix[(i,j)] = 1
  #print(val1)
Subseq=0
for n,val_n in enumerate((val1)):
    #print(n)
    #print(val_n)
    Subseq+=(len(val1[n])/len(Trainee_leftLeg_Sim_Actions0))*(1/len(val1))
    #print(Subseq)


nota= (0.2189*F1 +0.2132* Subseq +0.2017*GA+0.1903*SimilarDiagonalScore+0.176*Precision)*10

print(str(SimilarDiagonalScore))

print(str(Subseq))

print(str(Precision))

print(str(Recall))

print(str(Specificity))

print(str(Accuracy))

print(str(F1)) 


 
def test():
    print(str(nota)) 
if __name__=='__main__':
    test()
   
#df5.loc[(df5.simulationId == simulation) & (df5.traineeId == trainee), 'Precision3'] = Precision
#df5.loc[(df5.simulationId == simulation) & (df5.traineeId == trainee), 'Recall3'] = Recall
#df5.loc[(df5.simulationId == simulation) & (df5.traineeId == trainee), 'Specificity3'] = Specificity
#df5.loc[(df5.simulationId == simulation) & (df5.traineeId == trainee), 'Accuracy3'] = Accuracy
#df5.loc[(df5.simulationId == simulation) & (df5.traineeId == trainee), 'F13'] = F1
#df5.loc[(df5.simulationId == simulation) & (df5.traineeId == trainee), 'GA3'] = GA        
#df5.loc[(df5.simulationId == simulation) & (df5.traineeId == trainee), 'Diagonal'] = SimilarDiagonalScore            
#df5.loc[(df5.simulationId == simulation) & (df5.traineeId == trainee), 'Subseq'] = Subseq