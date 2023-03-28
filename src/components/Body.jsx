import React, { useEffect, useState } from "react";
import "antd/dist/reset.css";
import "./style.css";
import { Button, Row, Col, Modal } from "antd";
import CardImg from "../Images/Card.png"

export default function Body() {

  const [state, setState] = useState({
    arr: [],
    cards: "",
    lives: "",
    isWonOpen: false,
    isLostOpen: false,
    emoji: ""
  });
  const [isProgress, setIsProgress] = useState(false);

  useEffect(() => {
    const local_state = localStorage.getItem("progress");
    if(local_state!==null){
      setIsProgress(() => true)
    }
  }, []);

  const handleContinue = () => {
    const local_state = localStorage.getItem("progress");

    setState(() => JSON.parse(local_state));
    setIsProgress(()=> false);
  };

  const handleNew = () => {
    setIsProgress(()=> false);
    localStorage.removeItem("progress");
  }

  const handleOk = () => {
    setState((prevState) => {
      const newState = {
        ...prevState,
        isWonOpen: false,
        isLostOpen: false
      };
      localStorage.setItem("progress", JSON.stringify(newState));
      return newState;
    });
  };

  const handlePlayAgain = () => {
    initialGrid("new");
    setState((prevState) => {
      const newState = {
      ...prevState,
      isWonOpen: false,
      isLostOpen: false
      }
      localStorage.setItem("progress", JSON.stringify(newState));
      return newState;
    });
  };

  const initialGrid = async (caller)=>{
    if (caller !== "shuffle"){
      setState((prevState) => {
        const newState = {
          ...prevState,
          emoji: ""
        };
        localStorage.setItem("progress", JSON.stringify(newState));
        return newState;
      });
    }
    const t=[];
    for await (const x of Array(5).keys()){
      t.push(Math.floor(Math.random() * 4));
    }
    if (caller !== "shuffle"){
      setState((prevState) => {
        const newState = {
        ...prevState,
        emoji: "",
        lives: 0,
        arr: t,
        cards: 5
        };
        localStorage.setItem("progress", JSON.stringify(newState));
        return newState;
      });
    } else{
      setState((prevState) => {
        const newState = {
        ...prevState,
        arr: t,
        cards: 5,
        emoji: "🔀"
        };
        localStorage.setItem("progress", JSON.stringify(newState));
        return newState;
      });
    }
  }


  function renderCards(){
    const cardListImages = [];
    for(var i=0;i<state.cards;i++){
        cardListImages.push(<Col span={3}>
                <img src={CardImg} alt="Card" />
            </Col>);
    }
    return cardListImages;
  } 

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const openCard = async ()=>{
    var card_state = state.arr[state.arr.length-1];
    
    var lives_state;
    if(card_state===0){
      setState((prevState) => {
        const newState = {
          ...prevState,
          emoji: "😼",
          arr: state.arr.slice(0, state.cards-1),
          cards: state.cards-1
        };
        localStorage.setItem("progress", JSON.stringify(newState));
        return newState;
      });
    }
    else if(card_state===1){
      setState((prevState) => {
        const newState = {
          ...prevState,
          lives: state.lives+1,
          emoji: "🙅‍♂️",
          arr: state.arr.slice(0, state.cards-1),
          cards: state.cards-1
        };
        localStorage.setItem("progress", JSON.stringify(newState));
        return newState;
      });
    }else if(card_state===2){
      await initialGrid("shuffle");
    }else{
      lives_state= state.lives-1;
      if(lives_state<0){
        setState((prevState) => {
          const newState = {
            ...prevState,
            isLostOpen: true,
            emoji: "💣",
            arr: state.arr.slice(0, state.cards-1),
            cards: state.cards-1
          };
          localStorage.setItem("progress", JSON.stringify(newState));
          return newState;
        });
      }else{
        setState((prevState) => {
          const newState = {
            ...prevState,
            lives: state.lives-1,
            emoji: "💣",
            arr: state.arr.slice(0, state.cards-1),
            cards: state.cards-1
          };
          localStorage.setItem("progress", JSON.stringify(newState));
          return newState;
        });
      }
    }

    if(state.cards<=1){
      setState((prevState) => {
        const newState = {
        ...prevState,
        isWonOpen: true
        };
        localStorage.setItem("progress", JSON.stringify(newState));
        return newState;
      });
    }
  }
 
  return (
    <div>
      <Modal
        open={isProgress}
        title="Start from where you left"
        footer={[
          <div>
            <Button key="new" onClick={handleNew}>
              New Game
            </Button>
            <Button key="continue" onClick={handleContinue}>
              Continue
            </Button>
          </div>
        ]}
      >

      </Modal>
      <Modal
        open={state.isWonOpen}
        title="You Won"
        onOk={handleOk}
        footer={[
          <Button key="back" onClick={handlePlayAgain}>
            Play Again
          </Button>
        ]}
      ></Modal>
      <Modal
        open={state.isLostOpen}
        title="You Lost"
        onOk={handleOk}
        footer={[
          <Button key="back" onClick={handlePlayAgain}>
            Play Again
          </Button>
        ]}
      ></Modal>
      <Row>
        <Col span={8}>
            <div className="button">
                <Button size="large" type="primary" onClick={(event)=>initialGrid("new")}>Start New Game</Button>
            </div>
            <div className="button">
                <Button size="large" onClick={openCard} disabled={!state.cards}>Pick a Card from the Deck</Button>
            </div>
            <div className="button">
              Last Picked Card: {state.emoji}
            </div>

            <div className="button">
              🙅‍♂️ Remaining Lives: {state.lives}
            </div>
        </Col>
        <Col span={16} className = "cards">
            <Row>
                {renderCards()}
            </Row>
        </Col>
    </Row>

      
      
    </div>
  );
}