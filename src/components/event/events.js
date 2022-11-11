import React, { useEffect, useState } from "react";
import { Row, message, Modal, Col, Card, Button, Divider } from "antd";

/**  service */
import eventService from "../../services/events"

/** Import styles */
import "./event.less";

const Events = () => {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [betSlip, setBetSlip] = useState([])
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])   
  
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  
  /** Get All Events */
  async function getData (){
    try {
        let resp = await eventService.getAll();
        setData(resp);

    } catch (error) {
        message.error("An error has ocurred. Please try again");
    }        
  }

  /** Handle BetSlip */

  const addItem = (selections, item, mkt) => {
    const idBetSlip = betSlip.map(({id}) => id);
    console.log(idBetSlip)
    const isEqual = idBetSlip.includes(item.id);
    if(isEqual){
      deleteItem(item);
    }else{
      const active = selections.find(selection => {
        if(idBetSlip.includes(selection.id)){
          return selection;
        }
      });
      const aux = active ? [...betSlip] : [...betSlip, {...item, market: mkt}];
      setBetSlip(aux);
    }    
  }

  const deleteItem = (item) => {    
    let aux = betSlip.filter(({id}) => id !== item.id );
    setBetSlip(aux);    
  }

  return (
    <>
      <Button type="primary" onClick={() => setIsModalOpen(true)} style={{ marginBottom: "15px" }}>
        See Betslip
      </Button>      
      {
        data && data?.length > 0 ? 
        <>                
          <Row gutter={[16, { xs: 8, sm: 16, md: 8, lg: 8, xl: 8 }]}>
            {
              data.map((item, i) => {
                if(item.markets.length > 0){
                  return (
                    <Col
                      key={i + "-"}
                      xs={{ span: 24, offset: 0 }}
                      sm={{ span: 24, offset: 0 }}
                      md={{ span: 12, offset: 0 }}
                      lg={{ span: 8, offset: 0 }}
                      xl={{ span: 8, offset: 0 }}
                    > 
                      <Card className="card-dashboard" title={ item.name }>
                        {
                          item.markets.map((mkt, j) => {
                            if (mkt.name === "Team to Win"){
                              return (
                                <>                                    
                                  <h3>TO WIN</h3>
                                  <div className="div win">
                                    {
                                      mkt.selections.map((selection, k) => {
                                        const active = betSlip.find(({id}) => id === selection.id);
                                        return (

                                          <Button
                                            onClick={() => addItem(mkt.selections, selection, "to Win")}
                                            style={{ 
                                              background: active ? "#29ff7b" : "#fff", 
                                              color: active ?  "#00001e": "#29ff7b",
                                              marginRight: "1rem"
                                            }}> 
                                            { selection.name } 
                                            <br/> 
                                            { selection.price } 
                                          </Button>
                                        )
                                      })
                                    }
                                  </div>                
                                </>
                              )
                            }else{
                              return (
                                <>
                                  <Divider className="divider"></Divider>
                                  <h3>TO SCORE FIRST</h3>
                                  <div className="div">
                                    {
                                      mkt.selections.map((selection, k) => {
                                        const active = betSlip.find(({id}) => id === selection.id);
                                        return (
                                          <Button 
                                            onClick={() => addItem(mkt.selections, selection, "to Score First") }
                                            style={{ 
                                              background: active ? "#29ff7b" : "#fff", 
                                              color: active ?  "#00001e": "#29ff7b", 
                                          }}> 
                                            { selection.name } 
                                            <br/> 
                                            { selection.price } 
                                          </Button>
                                        )
                                      })
                                    }
                                  </div> 
                                </>
                              )
                            }                                 
                          })
                        }  
                      </Card>
                    </Col>
                  )
                }
              })
            }
          </Row>
        </> 
          :
        <>
          <h2>There are no events available yet</h2>
        </>
      }
      
      {/* Modal for Betslip */}

      <Modal title="Betslip"  onCancel={handleCancel} visible={isModalOpen} width={516} footer={null}>
        {
          betSlip.length > 0 ?
            betSlip.map((item, i) => {
              return (
                <>
                  <h3>{`${item.name} ${item.market}`}</h3>
                  <h2> { item.price } </h2>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button type="primary" onClick={() => deleteItem(item) }>Delete</Button>
                  </div>
                  <Divider className="divider"></Divider>
                </>
              )
            })
          :         
          <>
            <h4>You haven't selected anything yet</h4>
          </>
        }
      </Modal>
    </>
      
  );
};

export default Events;