
import React, { Component } from 'react'
import './Dashboard.css'
import { Collapse, Badge, Modal, ModalHeader } from 'reactstrap'

import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
  } from 'reactstrap';

var rx = [];
var eco = [];
var tac = [] ;
var analisis = [];
var item = rx;


export default class Nav extends Component {

    constructor(props){
        super(props);
        this.state = {
            collapse:false,
            modal: false,
            numRx: 0,
            numEco: 0,
            numTac: 0,
            numAna: 0,
            activeIndex: 0,
            animating: false,
            num: 0
        }
        this.toogle = this.toogle.bind(this)
    }
    
     

    componentDidUpdate(prevProps, prevState){            
        if (prevProps.num !== this.props.num && this.props.num !==0) {
            
            switch(this.props.id){
                case 0:
                    rx = this.props.type;
                    this.setState(({ numRx, num }) => ({
                        num: num + 1,
                        numRx: numRx + 1
                    }))
                    break;
    
                case 1:
                    eco = this.props.type;
                    this.setState(({ numEco, num }) => ({
                        num: num + 1,
                        numEco: numEco + 1
                    }))
                    break;
    
                case 2:
                    analisis = this.props.type;
                    this.setState(({ numAna, num }) => ({
                        num: num + 1,
                        numAna: numAna + 1
                    }))
                    break;
    
                case 3:
                    tac = this.props.type;
                    this.setState(({ numTac, num }) => ({
                        num: num + 1,
                        numTac: numTac + 1
                    }))
                    break;
    
                default:
                    break;
            }   
            this.props.type.push(
                {
                    src: this.props.content,  
                    altText: this.props.header,
                    caption: this.props.header
                }
            )
        }
        
            
        
    }

    setActiveIndex(next){
        this.setState({activeIndex: next});  
    }

    setModal(next){
        this.setState({modal: next});  
    }
    
    setCollapse(next){
        this.setState({collapse: next});  
    }

    setAnimating(next){
        this.setState({animating: next});
    }

    next(){
        if (this.state.animating) return;
        const nextIndex = this.state.activeIndex === rx.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setActiveIndex(nextIndex);
    }
    
    previous() {
        if (this.state.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? rx.length - 1 : this.state.activeIndex - 1;
        this.setActiveIndex(nextIndex);
    }
    
    goToIndex(newIndex) {
        if (!this.state.animating){
            this.setActiveIndex(newIndex);
        }
        
    }

    toogle(next) {
        switch(next){
            case rx:
                this.setState(({ num, numRx }) => ({
                    num: num - numRx,
                    numRx: 0
                }))
                break;

            case eco:
                this.setState(({ num, numEco }) => ({
                    num: num - numEco,
                    numEco: 0
                }))
                break;

            case analisis:
                this.setState(({ num, numAna }) => ({
                    num: num - numAna,
                    numAna: 0
                }))
                break;

            case tac:
                this.setState(({ num, numTac }) => ({
                    num: num - numTac,
                    numTac: 0
                }))
                break;

            default:
                break;
        } 
        item = next
        this.setModal(true)
    }

    

    render() {
        var slides = item.map((item) => {
            return (
              <CarouselItem
                onExiting={() => this.setAnimating(true)}
                onExited={() => this.setAnimating(false)}
                key={item.src}
              >
                <CarouselCaption captionHeader={(item.caption)? item.caption : ""} />
                <img src={item.src} width= "100%" alt={(item.altText) ? item.altText : ""} />
              </CarouselItem>
            );
          });

        const closeBtn = <button className="close" onClick={() => this.setModal(false)}>&times;</button>

        
        return (

            <div >
                <Modal isOpen={this.state.modal} >
                    <ModalHeader  close={closeBtn}></ModalHeader>
                    <Carousel
                        activeIndex={this.state.activeIndex}
                        next={() => this.next()}
                        previous={() => this.previous()}
                    >
                        <CarouselIndicators items={item} activeIndex={this.state.activeIndex} onClickHandler={() => this.goToIndex(this.state.activeIndex)} />
                        {slides}
                        <CarouselControl direction="prev" directionText="Previous" onClickHandler={() => this.previous()} />
                        <CarouselControl direction="next" directionText="Next" onClickHandler={() => this.next()} />
                    </Carousel>  
                </Modal> 
                <nav className="navbar navbar-dark bg-dark">
                    <div>
                        <button onClick={()=>this.setCollapse(!this.state.collapse)} className="navbar-toggler">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        {(this.state.num > 0)?
                        <Badge className="notification" color="primary">{this.state.num}</Badge>
                        : null
                        }
                    </div>
                    
                    
                </nav>
                <Collapse id="nav"
                    isOpen={this.state.collapse}
                >
                    <div id="list-example" className="list-group">
                        <li className="list-group-item list-group-item-action" onClick={() => this.toogle(analisis)}>Análisis {(this.state.numAna > 0)?
                        <Badge className="notification" color="primary">{this.state.numAna}</Badge>
                        : null
                        }</li>
                        <li className="list-group-item list-group-item-action" onClick={() => this.toogle(rx)}>Radiografías {(this.state.numRx > 0)?
                        <Badge className="notification" color="primary">{this.state.numRx}</Badge>
                        : null
                        }</li>
                        <li className="list-group-item list-group-item-action"  onClick={() => this.toogle(eco)}>Ecografías {(this.state.numEco > 0)?
                            <Badge className="notification" color="primary">{this.state.numEco}</Badge>
                            : null
                        }</li>
                        <li className="list-group-item list-group-item-action"  onClick={() => this.toogle(tac)}>TACs {(this.state.numTac > 0)?
                            <Badge className="notification" color="primary">{this.state.numTac}</Badge>
                            : null
                        }</li>
                        <li className="list-group-item list-group-item-action"  >Configuración</li>
                    </div>  
                </Collapse>
                        
            </div>
        )
    }
}
