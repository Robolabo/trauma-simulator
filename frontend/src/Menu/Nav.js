
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
var ecoFast = [];
var item = rx;


export default class Nav extends Component {

    constructor(props){
        super(props);
        this.state = {
            collapse:false,
            modal: false,
            num: 0,
            activeIndex: 0,
            animating: false,
        }
        this.toogle = this.toogle.bind(this)
    }
    
     

    componentDidUpdate(prevProps, prevState){
        if (prevProps.num !== this.props.num && this.props.num !==0) {
            this.setState({
              num: this.props.num
            });            

            switch(this.props.id){
                case 0:
                    rx = this.props.type;
                    break;
                case 1:
                    eco = this.props.type;
                    break;
                case 2:
                    ecoFast = this.props.type;
                    break;
                case 3:
                    tac = this.props.type;
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
        item = next
        this.setModal(true)
    }

    

    render() {
        console.log(item)
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
                        <li className="list-group-item list-group-item-action">Informe</li>
                        <li className="list-group-item list-group-item-action" onClick={() => this.toogle(rx)}>RX {(this.state.num > 0)?
                        <Badge className="notification" color="primary">{this.state.num}</Badge>
                        : null
                        }</li>
                        <li className="list-group-item list-group-item-action"  onClick={() => this.toogle(ecoFast)}>ECO-FAST</li>
                        <li className="list-group-item list-group-item-action"  onClick={() => this.toogle(eco)}>Ecografías</li>
                        <li className="list-group-item list-group-item-action"  onClick={() => this.toogle(tac)}>TACs</li>
                        <li className="list-group-item list-group-item-action"  >Configuración</li>
                    </div>  
                </Collapse>
                        
            </div>
        )
    }
}
