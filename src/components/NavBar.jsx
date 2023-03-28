import React, { useState } from "react";
import "antd/dist/reset.css";
import { Menu, Modal, Button } from "antd";
import "./style.css";

export default function NavBar(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRulesOpen, setIsRulesOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showRules = () => {
    setIsRulesOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setIsRulesOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsRulesOpen(false);
  };

  return (
    <Menu mode="horizontal">
      <Menu.Item key="mail">
        <a href="" className="headline">🐱Exploding Kitten</a>
      </Menu.Item>
      
      
      <Modal title="Leaderboard" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>

      <Menu.Item key="alipay">
        <Button type="text" size="large" className="navBar" onClick={showModal}>
          LeaderBoard
        </Button>
      </Menu.Item>

      <Modal title="Rules of Exploding Kitten Game" width={1000} open={isRulesOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>This will be an online single-player card game that consists of 4 different types of cards<br />
            - Cat card 😼<br />
            - Defuse card 🙅‍♂️<br />
            - Shuffle card 🔀<br />
            - Exploding kitten card 💣<br />
          There will be a button to start the game. When the game is started there will be a deck of 5 cards ordered randomly. Each time user clicks on the deck a card is revealed and that card is removed from the deck. A player wins the game once he draws all 5 cards from the deck and there is no card left to draw.<br />
          Rules –<br />
            - If the card drawn from the deck is a cat card, then the card is removed from the deck.<br />
            - If the card is exploding kitten (bomb) then the player loses the game.<br />
            - If the card is a defusing card, then the card is removed from the deck. This card can be used to defuse one bomb that may come in subsequent cards drawn from the deck.<br />
            - If the card is a shuffle card, then the game is restarted and the deck is filled with 5 cards again.</p>
      </Modal>

      <Menu.Item key="ali">
        <Button type="text" size="large" className="navBar" onClick={showRules}>
          Rules
        </Button>
      </Menu.Item>

      <Menu.Item key="al">
        <p className="user"> 😎 Welcome {props.userName}</p>
      </Menu.Item>
    </Menu>
  );
}
