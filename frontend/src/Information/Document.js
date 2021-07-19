import React, { Component } from 'react';
import { Button,  } from 'react-bootstrap';
import axios from 'axios';

const baseUrl = "http://138.100.21.252:5000"

export default class Document extends Component {

    constructor(props){
        super(props);
        this.state = {
          file: null
        }
    }
    
    
    componentDidMount() {
        let simulationId = this.props.simulationId
        const url = baseUrl+"/simulation/get/"+simulationId
        axios.get(url)
        .then(res=>{
            if (res.data.success) {
                const data = res.data.data[0]
                if(data.inform){
                    var decoder = new TextDecoder('utf8');
                    var fileCode = btoa(decoder.decode(Buffer.from(data.inform.data)));
                    var file = atob(fileCode)
                    this.setState({
                        file: file
                    })
                }
                
                
            }
            else {
            alert("Error web service")
            }
        })
        .catch(error=>{
            alert("Error server "+error)
        })
        
    }
  
    // JSpdf Generator For generating the PDF
    

    downloadPDF(next) {
        
        var d = new Date()
        const linkSource = `data:application/pdf;base64,${next}`;
        const downloadLink = document.createElement("a");
        const fileName = `${d.getDate() < 10 ? "0"+d.getDate(): d.getDate()}_${(d.getMonth()+1) < 10 ? "0"+(d.getMonth()+1): (d.getMonth()+1)}_${this.props.surname}.pdf`;
    
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
    }

    /*handleUploadFile(event) {
        let selectedFile = event.target.files;
        let file = null;
        let fileName = "";
        //Check File is not Empty
        if (selectedFile.length > 0) {
            // Select the very first file from list
            let fileToLoad = selectedFile[0];
            fileName = fileToLoad.name;
            // FileReader function for read the file.
            let fileReader = new FileReader();
            // Onload of file read the file content
            fileReader.onload = function(fileLoadedEvent) {
                file = fileLoadedEvent.target.result;
                // Print data in console
                console.log(file);
            };
            // Convert data to base64
            fileReader.readAsDataURL(fileToLoad);
        }
    
      this.setState({
        fileData: file,
        fileName: fileName
      })
    }*/
  
    render(){
      return(
          <div>
            {this.state.file !== null ?
                <Button onClick= {() => this.downloadPDF(this.state.file)} variant="info"> Descargar </Button> 
            : <div>Pendiente</div>
            } 
          </div>
          
        )
     }
  
  
}