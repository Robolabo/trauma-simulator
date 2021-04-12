import React, { Component } from 'react'
import { Button, UncontrolledPopover, PopoverHeader, PopoverBody, Table } from 'reactstrap';
import '../simulation.css'
import historial from '../../assets/historial.png'

export default class Messages extends Component {

    /*componentDidUpdate(){
       if(this.props.alert !== null) {
           this.props.toogle() 
        }
    }   */

    loadFillData() {
        return this.props.information.map((info)=>{
          return(
            <tr>
              <td>{info.min}:{info.seg < 10 ? "0"+info.seg : info.seg}</td>
              <td>{info.msg}</td>
            </tr>
          )
        });
    }

    render() {
        return (
            <div>
                <Button id="PopoverFocus" className="popover-hist" type="button">
                    Historial <img src={historial} alt="urine" width="25vw" height="25vh"></img>
                </Button>
                {this.props.alert}
                <UncontrolledPopover trigger="focus" placement="bottom" target="PopoverFocus">
                    <PopoverBody className="actions-info">
                    <Table>
                        <thead>
                            <tr>
                            <th>Tiempo</th>
                            <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.loadFillData()}
                        </tbody>
                        </Table>
                    </PopoverBody>
                </UncontrolledPopover>
            </div>
        )
    }
}
