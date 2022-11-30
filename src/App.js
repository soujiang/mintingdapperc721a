import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";
import Web3 from "web3";
import 'rsuite/styles/index.less';
import "rsuite/dist/rsuite.min.css";
import { Panel, PanelGroup } from 'rsuite';
import { Carousel } from 'rsuite';
import { Notification, toaster } from 'rsuite';
import { Loader } from 'rsuite';
import { Badge } from 'rsuite';

const truncate = (input, len) =>
  input.length > len ? `${input.substring(0, len)}...` : input;

export const StyledButton = styled.button`
  font-family: 'coder';
  padding: 10px;
  font-size: 1rem;
  border-radius: 6px;
  border: none;
  background-color: black;
  padding: 10px;
  letter-spacing: 2px;
  font-weight: bold;
  color: white;
  width: 270px;
  height: 50px;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px black;
  -webkit-box-shadow: 0px 6px 0px -2px black;
  -moz-box-shadow: 0px 6px 0px -2px black;
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
  :hover {
    color: silver;
  }
  @media (max-width: 565px) {
    width: 200px;
    height: 50px;
    font-size: 0.75rem;
  }
`;

export const CTNButton = styled.button`
  font-family: 'coder';
  padding: 10px;
  font-size: 1rem;
  border-radius: 6px;
  border: none;
  background-color: black;
  padding: 10px;
  letter-spacing: 2px;
  font-weight: bold;
  color: white;
  width: 270px;
  height: 50px;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px black;
  -webkit-box-shadow: 0px 6px 0px -2px black;
  -moz-box-shadow: 0px 6px 0px -2px black;
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
  :hover {
    color: silver;
  }
  @media (max-width: 565px) {
    width: 200px;
    height: 50px;
    font-size: 0.75rem;
  }
`;

export const Maxbtn = styled.button`
  font-family: 'coder';
  font-size: 0.75rem;
  border-radius: 10px;
  background-color: #F48C2C;
  font-weight: bold;
  color: white;
  width: 80px;
  height: 30px;
  cursor: pointer;
  letter-spacing: 2px;
  :hover {
    color: black;
  }
  @media (max-width: 565px) {
    width: 200px;
    height: 50px;
    font-size: 0.75rem;
  }
`;

export const StyledRoundButton = styled.button`
  padding: 10px;
  border-radius: 10px;
  border: none;
  background-color: transparent;
  padding: 10px;
  font-weight: bold;
  font-size: 30px;
  color: white;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
  :hover {
    color: silver;
  }
`;

export const LogoDiv = styled.div`
display: flex;
align-items: center;
justify-content: center;
align-content: center;
gap: 10%;
width: 300px;
`;

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: center;
  margin: auto;
  width: 70%;
  border: 2px solid white;
  border-radius: 40px;
  background: linear-gradient(90deg, rgba(135,142,20,1) 10%, rgba(0,125,223,1) 93%);
    @media (min-width: 767px) {
    flex-direction: row;
  }
`;

export const ResponsiveWrapperHeader = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-height: 80px;
  padding: 10px;
  background-color : #252525;
  @media (min-width: 767px) {
    flex-direction: row;
  }
  @media (max-width: 565px) {
    max-height: 220px;
  }
`;

export const StyledLogo = styled.img`
  display: inline;
  width: 200px;
  @media (max-width: 767px) {
    width: 150px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

export const StyledImg = styled.img`
  width: 450px;
  border-radius: 5px;
  @media (min-width: 900px) {
    width: 450px;
  }
  @media (min-width: 1000px) {
    width: 450px;
  }
  transition: width 0.5s;
  @media (max-width: 565px) {
    width: 200px;
  }
`;

export const Styledroad = styled.img`
  width: 100%;
  border-radius: 5px;
  transition: width 0.5s;
`;

export const StyledImgSmall = styled.img`
  width: 220px;
  height: 220px;
  border-radius: 5px;
  @media (min-width: 900px) {
    width: 220px;
    height: 220px;
  }
  @media (min-width: 1000px) {
    width: 220px;
    height: 220px;
  }
  transition: width 0.5s;
  @media (max-width: 565px) {
    width: 200px;
  }
`;

export const StyledLink = styled.a`
  color: var(--secondary);
  text-decoration: none;
`;

export const WalletBox = styled.div`
  text-decoration: none;
  border-radius: 10px;
  border: 2px solid white;
  background-color: transparent;
  //padding: 10px;
  font-weight: bold;
  font-size: 15px;
  width: 180px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 0px -2px white;
  -webkit-box-shadow: 0px 4px 0px -2px white;
  -moz-box-shadow: 0px 4px 0px -2px white;
  @media (max-width: 565px) {
    margin-top: 20px;
  
`;

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [walletAddress, setAddress] = useState("Not Connected");
  const [claimingNft, setClaimingNft] = useState(false);
  const [feedback, setFeedback] = useState(``);
  const [tokens, settokens] = useState(1);
  const [brd, setbrd] = useState("2px solid #FFFFFF");
  const [bxsh, setbxsh] = useState("0px 0px 3px 0px #FFFFFF");
  const [DOT, setDOT] = useState("red");
  const [type, setType] = React.useState('info');
  const [placement, setPlacement] = React.useState('topStart');
  const errmessage = (
    <Notification type={'error'} header={'error'} closable>
     Sorry, something went wrong please try again later.
    </Notification>
  );
  const txmessage = (
    <Notification type={'success'} header={'success'} closable>
     Congrats, Mint Was successfull.
    </Notification>
  );
  const mntmessage = (
    <Notification type={'info'} header={'success'} closable>
     <Loader/> Minting in Progress....
    </Notification>
  );
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    NFT_NAME: "",
    SYMBOL: "",
    MAX_SUPPLY: 1,
    DISPLAY_COST: 0,
    WL_Display: 0,
    GAS_LIMIT: 0,
    MAX_PER_TX: 0,
    MARKETPLACE: "",
    MARKETPLACE_LINK: "",
    Telegram: "",
    Discord: "",
    Twitter1: "",
    Twitter2: "",
    Twitter3: "",
    SHOW_BACKGROUND: false,
  });

  const claimNFTs = () => {
    let cost = CONFIG.DISPLAY_COST * tokens;
    let price = Web3.utils.toWei(cost.toString(), 'ether');
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalGasLimit = String(gasLimit);
    console.log("Cost: ", price);
    console.log("Gas limit: ", totalGasLimit);
    setFeedback(`Minting your ${CONFIG.NFT_NAME}...`);
    setClaimingNft(true);
    setbrd("2px solid yellow");
    setbxsh("0px 0px 3px 0px yellow");
    toaster.push(mntmessage, { placement })
    blockchain.smartContract.methods
      .mint(tokens)
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: price,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
        toaster.push(errmessage, { placement })
        setbrd("2px solid red");
        setbxsh("0px 0px 3px 0px red");
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback(
          `WOW, the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`
        );
        toaster.push(txmessage, { placement })
        setbrd("2px solid green");
        setbxsh("0px 0px 3px 0px green");
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const decrementtokens = () => {
    let newtokens = tokens - 1;
    if (newtokens < 1) {
      newtokens = 1;
    }
    settokens(newtokens);
  };

  const incrementtokens = () => {
    let newtokens = tokens + 1;
    if (newtokens > CONFIG.MAX_PER_TX) {
      newtokens = CONFIG.MAX_PER_TX;
    }
    settokens(newtokens);
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
      setAddress(blockchain.account.substring(0,4) + "..." + blockchain.account.substring(38,42));
      setDOT("green");
    }
  };

  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  return (
    <s.Screen>
      <s.Container
        flex={1}
        // ai={"center"}
        style={{backgroundColor: "var(--primary)" }}
        image={CONFIG.SHOW_BACKGROUND ? "/config/images/bg.png" : null}
      >
        <ResponsiveWrapperHeader>

          <LogoDiv>
          <a href="#" target={"_blank"}>
            <StyledLogo alt={"logo"} src={"/config/images/logo.png"} />
          </a>
          </LogoDiv>

          <s.Headerlinks>
          <s.StyledLink href="https://electhrons.github.io/" target={"_blank"}>
              Electhrons
            </s.StyledLink >
            <s.StyledLink href="#story">
              Story
            </s.StyledLink >
            <s.StyledLink href="#sneak">
               Sneak Peaks
              </s.StyledLink>
              <s.StyledLink href="#faq">
               FAQ
              </s.StyledLink>
          </s.Headerlinks>



          <s.HeaderDiv>
          <s.socialDiv>
          <a href={CONFIG.Telegram} target={"_blank"}>
          <s.Icons src="/config/images/telegram.svg" alt="telegram" />
          </a>
          <a href={CONFIG.Twitter1} target={"_blank"}>
          <s.Icons src="/config/images/twitter.svg" alt="twitter Soujiang" />
          </a>
          <a href={CONFIG.Twitter2} target={"_blank"}>
          <s.Icons src="/config/images/twitter.svg" alt="twitter Electhrons" />
          </a>
          <a href={CONFIG.Twitter3} target={"_blank"}>
          <s.Icons src="/config/images/twitter.svg" alt="twitter Lormirian Infinity" />
          </a>
          <a href={CONFIG.Discord} target={"_blank"}>
          <s.Icons src="/config/images/discord.svg" alt="discord" />
          </a>
          <a href={CONFIG.MARKETPLACE_LINK} target={"_blank"}>
          <s.Icons src="/config/images/opensea.svg" alt="opensea" />
          </a>
          </s.socialDiv>
          <WalletBox>
            {blockchain.account !== "" ? (
            <>
            <s.TextSubTitle style={{fontSize: "1rem", color: "white"}}>
            <Badge color={DOT}/> {walletAddress}
              </s.TextSubTitle>
            </>
            ) : null }
          </WalletBox>
          </s.HeaderDiv>

        </ResponsiveWrapperHeader>
        <s.SpacerLarge/>

        <s.Container flex={1} jc={"center"} ai={"center"}>
          <s.TextTitle>
            Mint Your {CONFIG.NFT_NAME}
          </s.TextTitle>

        </s.Container>
    
        <s.SpacerSmall />
        <ResponsiveWrapper flex={1} style={{ padding: 24 }} test>
        <StyledImg src={"/config/images/4650.png"} alt="image" />
        <s.SpacerSmall/>
            <s.Container flex={1} jc={"center"} ai={"center"} >


           {Number(data.totalSupply) >= CONFIG.MAX_SUPPLY ? (
              <>
                <s.TextSub
                  style={{ textAlign: "center", color: "var(--accent-text)", fontFamily: "coder" }}
                >
                  The sale has ended.
                </s.TextSub>
                <s.TextDescription
                  style={{ textAlign: "center", color: "var(--accent-text)", fontFamily: "coder" }}
                >
                  You can still find {CONFIG.NFT_NAME} on
                </s.TextDescription>
                <s.SpacerSmall />
                <StyledLink target={"_blank"} href={CONFIG.MARKETPLACE_LINK}>
                  {CONFIG.MARKETPLACE}
                </StyledLink>
              </>
            ) : (
              <>
                <s.TextSub
                  style={{ textAlign: "center", color: "var(--accent-text)", fontFamily: "coder"  }}
                >
                  {data.totalSupply} | {CONFIG.MAX_SUPPLY}
                </s.TextSub>
                <s.SpacerSmall />
                <s.TextTotal style={{background: "white" , borderRadius: 5, padding: 8, color: "black"}}>
                      Price&emsp;&emsp;&emsp;&emsp;&emsp;{CONFIG.DISPLAY_COST}{" "}{CONFIG.NETWORK.SYMBOL}
                    </s.TextTotal>
                <s.SpacerMedium/>
                {blockchain.account === "" ||
                blockchain.smartContract === null ? (
                  <>
                  <s.Container ai={"center"} jc={"center"}>
                    <s.SpacerSmall />
                    <CTNButton
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(connect());
                        getData();
                      }}
                    >
                      CONNECT Wallet
                      <img style={{width: 30, paddingLeft: 10 }} src={"/config/images/mm.svg"} />
                    </CTNButton>
                    {blockchain.errorMsg !== "" ? (
                      <>
                        <s.SpacerSmall />
                        <s.TextDescription
                          style={{
                            textAlign: "center",
                            color: "var(--accent-text)",
                            fontFamily: "coder",
                            fontSize: 20
                          }}
                        >
                          {blockchain.errorMsg}
                        </s.TextDescription>
                      </>
                    ) : null}
                  </s.Container>
                  </>
                ) : (
                  <>
                    <s.AmountContainer style={{
                      border: brd,
                      boxShadow: bxsh,
                    }}>
                      <StyledRoundButton
                        style={{ lineHeight: 0.4 }}
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          decrementtokens();
                        }}
                      >
                        -
                      </StyledRoundButton>
                      <s.TEXTamount>
                        &ensp;&ensp;&ensp;&ensp;{tokens}&ensp;&ensp;&ensp;&ensp;
                      </s.TEXTamount>
                      <s.SpacerMedium />
                      <StyledRoundButton
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          incrementtokens();
                        }}
                      >
                        +
                      </StyledRoundButton>
                    </s.AmountContainer>
                    <s.SpacerSmall />
                    <Maxbtn
                        onClick={(e) => {
                          e.preventDefault();
                          settokens(CONFIG.MAX_PER_TX);
                        }}
                        >
                      SetMax
                    </Maxbtn>
                    <s.SpacerSmall />
                    <s.SpacerSmall />
                    <s.TextTotal style={{color: "black"}}>
                      Total&emsp;&emsp;&emsp;&emsp;&emsp;{(CONFIG.DISPLAY_COST * tokens).toString().substring(0, 6)}{" "}{CONFIG.NETWORK.SYMBOL}
                    </s.TextTotal>
                    <s.SpacerSmall />
                    <s.SpacerXSmall />
                    <s.Container ai={"center"} jc={"center"} fd={"column"}>
                            <StyledButton
                            disabled={claimingNft ? 1 : 0}
                            onClick={(e) => {
                              e.preventDefault();
                              claimNFTs();
                              getData();
                            }}
                          >
                            {claimingNft ? <Loader speed="fast" content="Minting..." /> : "MINT"} 
                          </StyledButton>
                    </s.Container>
                    <s.SpacerXSmall/>
                    <s.TextSubTitle style={{fontSize: 15}}>
                    Max {CONFIG.MAX_PER_TX} Per Tx
                    </s.TextSubTitle>
                    <s.SpacerXSmall/>
                    <s.TextSubTitle style={{textAlign: "center", fontSize: "1rem"}}>
                    {feedback}
                    </s.TextSubTitle>
              </>
            )}
            </>
            )}
            <s.SpacerMedium />
            </s.Container>
          <s.SpacerLarge />
        </ResponsiveWrapper>


        <s.SpacerLarge />
        <s.SecContainer id="story">
        <s.TextTitle>
            STORY
            </s.TextTitle>
            <s.SpacerLarge/>
            <s.TextP style={{textAlign: "justify"}}>

            CATLAND KITTEN - Build your creature NFT 2.0 to interact with our LORMIRIAN INFINITY metaverse, our financial ecosystem, and our blockchain.
            <br></br><br></br>
            Do you know the NFT 2.0? The NFT 2.0 are multi-format NFTs that can contain within themselves various types of video, audio and image files. NFTs 2.0 are editable and allow owners and creators to evolve them, improving their features. But the most important thing about NFTs 2.0 is that they have a purpose. Our NFTs 2.0 will interact with our LORMIRIAN INFINITY metaverse, allowing the owner of any of our creatures to generate money automatically, within our metaverse, by automating tasks.
            <br></br><br></br>
            In order to enter our metaverse, you need a creature NFT 2.0. To assemble your creatures you need to join several normal NFTs in our DApp and you can get, by joining all the parts, your creature NFT 2.0. The best thing is that we are going to release at 0 cost (except the value of gas) all the NFTs you need to build your creature NFT, so you can interact with our metaverse and earn money.
            <br></br><br></br>
            These NFTs are part of our financial ecosystem, which is made up of a cryptocurrency, financial DApps in which you can invest and earn money, a metaverse, oracles, a new chain of blocks, several NFTs 2.0 that interact with each other in a new financial ecosystem, that will allow you to earn money automatically. The first step you have to take is simply to collect our NFTs, so you can build your NFT 2.0 and enter our METAVERSE.
            <br></br><br></br>
            The CATLAND KITTEN, are the base creatures, which will determine the gender of your creature, you can have a female, male or LGTB++ creature, with any of the creatures you can earn money in different ways in our metaverse, buying and selling properties, with paid jobs , belonging to royalty and other works, with bets in casinos, investing in different businesses, buying or selling shares in our stock market, exchanging services with other users of the metaverse and much more. We invite you to read our Whitepaper for more details.
</s.TextP>
            </s.SecContainer>

            <s.SecContainer id="sneak">
            <s.TextTitle>
            Sneak Peaks
            </s.TextTitle>
            <s.SpacerLarge/>
            <s.CBOX>
            <Carousel autoplay className="custom-slider">
<img src="/config/images/22.png" />
<img src="/config/images/76.png" />
<img src="/config/images/143.png" />
<img src="/config/images/733.png" />
<img src="/config/images/870.png" />
<img src="/config/images/1438.png" />
<img src="/config/images/2110.png" />
<img src="/config/images/3111.png" />
<img src="/config/images/3406.png" />
<img src="/config/images/4650.png" />
  </Carousel>
  </s.CBOX>
              </s.SecContainer>

              <s.SecContainer id="faq">
            <s.TextTitle>
            FAQ
            </s.TextTitle>
            <s.SpacerLarge/>
            <PanelGroup style={{width: "80%", borderColor: "#A9D0D2"}} accordion bordered>
    <Panel header="WHAT ARE THE NFT 2.0?">
    <s.TextP style={{textAlign: "justify"}}>
    There are two types of possible definitions for an NFT 2.0. On the one hand we can say that an NFT 2.0 is a useful NFT, which is more than just an image, gif or video, but rather an NFT that provides some service to the owner. For example special memberships to exclusive clubs, concert tickets, etc.
    <br></br><br></br>
    The other aspect defines NFTs 2.0 as a multi-format NFT that contains within itself various types of files, which can be video, audio, images in different types, quantities and forms. This type of NFTs are upgradeable, both by the creator and by the owner, which allows creating more dynamic NFTs that evolve over time.
    <br></br><br></br>
    In our financial ecosystem, both conditions are met. On the one hand, the NFTs 2.0 of our ecosystem are updatable by the owner, who using our DApp can remove or add NFTs that allow him to improve his NFT 2.0, to increase his profits. On the other hand, all the NFTs 2.0 in our ecosystem are necessary to interact with our metaverse, functioning as an avatar so that the user can earn money inside and outside the metaverse of LORMIRIAN INFINITY.
          </s.TextP>
    </Panel>
    <Panel header="WHAT ARE CATLAND KITTENS?">
    <s.TextP style={{textAlign: "justify"}}>
    The CATLAND KITTEN are the first of many NFTs that we will be uploading to OPENSEA, so that anyone can build their NFT 2.0 in our financial ecosystem. The CATLAND KITTEN define the gender of your NFT 2.0 creature. There are 3 possible gender types for your NFT 2.0 creature; feminine, masculine and LGTB++. We will upload each genre independently. The first gender we will upload is the female gender, then the male gender and the LGTB ++. We do it this way because our purpose is to reach a minimum of 1,000,000 inhabitants in our metaverse and in this way we have an order in the number and type of NFT 2.0 creatures that will be created.
    <br></br><br></br>
    In addition, the CATLAND KITTEN, like other NFTs that we will be uploading, give owners the possibility of increasing the statistics and earnings of the NFT 2.0 creatures they build, you can read more details about this in our whitepaper or in the special document that we have prepared to explain how our NFTs 2.0 work.
          </s.TextP>
    </Panel>
    <Panel header="HOW TO PARTICIPATE IN OUR AIRDROP?">
    <s.TextP style={{textAlign: "justify"}}>
The adventure is just beginning, so join now and stay tuned so you can win from the start. Broadly speaking, the entire project that we are developing will be divided into several stages:
<br></br><br></br>
1. Zero cost NFT launch so users can collect the pieces and build their NFT 2.0 with our DApp.
<br></br><br></br>
2. When we have reached a certain number of participants in our social networks, we will launch different investment packages so that investors can obtain cryptocurrencies at a very low cost, special NFTs of creatures, Properties in the metaverse, NFTs of improvement for their NFTs 2.0, etc.
<br></br><br></br>
3. Once all the packages have been distributed among the investors who wish to participate in this first stage, we will launch the airdrop of our cryptocurrency, where we will also deliver NFTs 2.0, properties in the metaverse, and NFTs, through a raffle, among all those who They have sold, bought or given away the different collections of NFTs that we are uploading to OPENSEA. Favoring the exchange of the NFTs of the different collections that we will be uploading.
<br></br><br></br>
Essentially, all you have to do to participate in our AIRDROP, is simply coin, and start trading or selling any of the NFTs from all the collections that we are going to upload. We will start with CATLAND KITTEN, and then we will continue uploading more collections, so that you can acquire them.
<br></br><br></br>
All the NFTs of our collections participate. It's that easy to participate in our AIRDROP, while earning money by selling the NFTs. You just have to consider that, if you redeem any of our NFTs at zero cost, using our minting DApp, you will participate in the airdrop when you have given away, exchanged or sold, any of the NFTs that you have obtained at zero cost. But if you buy any of the NFTs from any other user, you will already be participating, without doing anything else. The more NFTs you trade, the more chances you have to be a winner in our AIRDROP, because the more NFTs you trade, the more times your address will appear in the AIRDROP draws.
    </s.TextP>
    </Panel>
    <Panel header="HOW DOES THE CREATION OF NFTs 2.0 WORK IN OUR FINANCIAL ECOSYSTEM?">
    <s.TextP style={{textAlign: "justify"}}>
    When enough NFTs have been uploaded for users to start building their creature NFTs 2.0, we will release access to our NFT 2.0 Build DApp. In it, the owners of the NFTs will be able to connect using their wallets and, in the same way as the avatars of games like Fortnite and others are built, by putting all the NFTs together within our DApp, people will be able to build a new NFT 2.0 , which will be the sum of all the parts that you have put together and that will allow you to interact with our ecosystem.
    <br></br><br></br>
    The most interesting thing about this system is that as you get more NFTs you will be able to improve your NFT 2.0, improving, at the same time, the ability of your NFT 2.0 creature to earn money within our metaverse.
          </s.TextP>
    </Panel>
    <Panel header="WHAT IS LORMIRIAN INFINITY AND HOW DO YOU MAKE MONEY THERE?">
    <s.TextP style={{textAlign: "justify"}}>
    LORMIRIAN INFINITY is a metaverse created for NFT 2.0 creatures to interact and earn money automatically in various ways. LORMIRIAN INFINITY is divided into several regions, each region is dominated by a predominant creature type. The first creatures we will release are the cats from CATLAND. But eventually other creatures will appear in other regions of the metaverse such as dogs, bulls, birds, etc. All creatures will work with the same system.
    <br></br><br></br>
    There are many ways to earn money within LORMIRIAN INFINITY. From betting, selling properties, games, racing, buying and selling shares, etc. The number of ways to earn money within LORMIRIAN INFINITY is varied and will evolve over time, you can read more in our whitepaper. The best thing is that each creature you have, allows you to earn money within the metaverse and with the use of NPCs, creature owners can automate the ways of earning money, according to the predominant professions that their NFTs 2.0 of creatures have. We recommend you read our whitepaper to fully understand the entire system.
          </s.TextP>
    </Panel>
    <Panel header="WHY I NEED A CREATURE NFT 2.0 TO PARTICIPATE IN YOUR FINANCIAL ECOSYSTEM?">
    <s.TextP style={{textAlign: "justify"}}>
    The NFT 2.0 you have will represent you in our financial ecosystem. They are the avatar you will interact with in the decentralized world we are creating. Creature NFT 2.0 will allow you to enter our metaverse, where practically all the business of our financial ecosystem will be carried out and will allow you to be the first to participate in exclusive investments for metaverse participants.
          </s.TextP>
    </Panel>
    <Panel header="HOW MANY NFT CREATURES CAN I HAVE?">
    <s.TextP style={{textAlign: "justify"}}>
    You can have all the NFT 2.0 creatures you want, all you need is to get all the parts of your NFT 2.0 to build them, using our DApp.
          </s.TextP>
    </Panel>
    <Panel header="WHAT OTHER KIND OF NFT 2.0 DOES YOUR FINANCIAL ECOSYSTEM HAVE?">
    <s.TextP style={{textAlign: "justify"}}>
    There are 3 classes of NFT 2.0 in our financial ecosystem that are necessary to a greater or lesser extent to interact with the metaverse we are building.
    <br></br><br></br>
    Creature NFTs 2.0. These are the main NFTs that you need to interact with our metaverse, with them you will be able to access businesses, games and many ways to earn money.
    <br></br><br></br>
    Houses NFTs 2.0. In order to spend a long time in our metaverse, creating businesses and participating, you need to have a property in the metaverse, where your creature can live and prosper.
    <br></br><br></br>
    The NFT 2.0 of transport. These are luxury NFTs that allow your creature NFT 2.0 to move within the metaverse, participate in races and competitions with which you can earn money.
          </s.TextP>
    </Panel>
    <Panel header="WHY THE NFT 2.0 HAVE THE FORM OF A COLLECTIBLE CARD?">
    <s.TextP style={{textAlign: "justify"}}>
    The NFTs that will make up your NFT 2.0 are in the form of a collectible card, because we wanted the parameters that you can increase to be perfectly visible to everyone from the first moment. In this way you will be aware at all times of what type of card you have in your possession.
    <br></br><br></br>
    We also believe that by having the form of a collectible card, the NFT 2.0 formation process is much better understood, since you have to collect each part of your NFT 2.0 creature to unite them in the DApp and create your NFT 2.0. Essentially it is as if you put together your playing deck and by putting together your NFT 2.0 you make your move.
          </s.TextP>
    </Panel>
    <Panel header="WHAT DO THE BONUSES AND COMPATIBILITIES OF NFTS AND ITS SYMBOLS MEAN?">
    <s.TextP style={{textAlign: "justify"}}>
    We will briefly explain the signs and symbols of NFTs. Although if you want more details we recommend you read the whitepaper where everything is explained in greater detail. Each symbol on your NFT represents how important your NFT 2.0 will be within the metaverse and how much money, position, rank and recognition you will have within the cities of LORMIRIAN INFINITY, as well as the jobs you can apply for.
    <br></br><br></br>
    The medals that are on the top right determine the degree of importance that the NFT 2.0 creature will have within the metaverse. From the most important to the least important the categories are: diamond, gold, silver, bronze and copper. In addition, each type of medal has from 1 to 10 subcategories. A level 10 diamond will always be more important than a level 1 diamond.
    <br></br><br></br>
    The stars on the top left, like the medals, determine how important your NFT 2.0 creature will be to the metaverse. The fundamental difference with the medals is that the stars can be considered as minor trophies, but just as important to determine the worth of your NFT 2.0.
    <br></br><br></br>
    Bonuses are all the added values ​​that your NFT 2.0 creature can have. The money bonus will increase the amount of money your creature will receive. Potions will maximize the effect of potions. NPCs will allow you a higher degree of automation. Suits will allow you to have higher quality suits with greater effect. Transport will allow you to have better quality NFT 2.0 vehicles within the metaverse. Properties will allow you to have better quality NFT 2.0 houses or land within the metaverse. The titles of nobility will allow you to be more recognized and access better investments within the metaverse.
    <br></br><br></br>
    On the other hand, compatibilities allow you to know which automatable jobs within the metaverse you are most compatible with and how these will allow you to earn more money within the metaverse. You have several types of jobs that you can access, all automatable through NPCs: supreme court, cleric, parliament, craftsman, army, healer, guilds, other jobs, and royalty. All jobs are divided into various subcategories, which would take too long to describe here.
    <br></br><br></br>
    On the other hand, all the bonuses and compatibilities are cumulative. That is, if you have, for example, 10 bonus money and each one multiplies 5%, then you will get 50% more money in paid activities within the metaverse. So if you earn 100 Catchips, for your work in the metaverse, you will earn 50% with the bonus. But you must take into account the degree of tolerance of your creature to bonuses or compatibilities. Copper-type creatures, for example, can allow a maximum tolerance of 10% on any bonus or compatibility, so it won't matter if the total sum of your bonus is 70%, because your creature will only tolerate 10% bonuses. Fortunately, there are many ways to improve your NFT 2.0 creature, so that you can take full advantage of your bonuses. We recommend you read the whitepaper and the technical document of the NFTs for more details.
          </s.TextP>
    </Panel>
    <Panel header="WHAT IS THE AUTHENTICATION CODE?">
    <s.TextP style={{textAlign: "justify"}}>
    The authentication code allows you to identify your NFT in our database, giving it a unique and unrepeatable code to prevent forgery. This way you will have the certainty that your NFT is legitimate when you search for it in the database that we will constantly update.
          </s.TextP>
    </Panel>
    <Panel header="HOW IS THE TYPE OF CREATURE I WILL HAVE DETERMINED?">
    <s.TextP style={{textAlign: "justify"}}>
    To understand this, we recommend you read this document.
          </s.TextP>
    </Panel>
    <Panel header="HOW CAN I BECOME A COLLABORATOR?">
    <s.TextP style={{textAlign: "justify"}}>
    It is simple, if you are a programmer, you have contacts with investors that you think can participate, if you are an influencer, if you have groups of investors in cryptocurrencies, etc. You can contact us through the contact form, telling us how you can collaborate in the project and we will contact you.
    <br></br><br></br>
    http://t.me/KolPartnerBot
    <br></br><br></br>
    All collaborators get, to the extent of their participation, a collaborator package, which contains cryptocurrencies, NFTs 2.0, NFTs and other things. So if you are interested in participating, please contact us.
    <br></br><br></br>
    https://electhrons.github.io/#
          </s.TextP>
    </Panel>
  </PanelGroup>
            </s.SecContainer>



            <s.SecContainer id="">
                <s.socialDiv>
          <a href={CONFIG.Telegram} target={"_blank"}>
          <s.Icons src="/config/images/telegram.svg" alt="telegram" />
          </a>
          <a href={CONFIG.Twitter1} target={"_blank"}>
          <s.Icons src="/config/images/twitter.svg" alt="twitter Soujiang" />
          </a>
          <a href={CONFIG.Twitter2} target={"_blank"}>
          <s.Icons src="/config/images/twitter.svg" alt="twitter Electhrons" />
          </a>
          <a href={CONFIG.Twitter3} target={"_blank"}>
          <s.Icons src="/config/images/twitter.svg" alt="twitter Lormirian Infinity" />
          </a>
          <a href={CONFIG.Discord} target={"_blank"}>
          <s.Icons src="/config/images/discord.svg" alt="discord" />
          </a>
          <a href={CONFIG.MARKETPLACE_LINK} target={"_blank"}>
          <s.Icons src="/config/images/opensea.svg" alt="opensea" />
          </a>
          </s.socialDiv>
          <s.SpacerLarge/>
          <s.TextP>
          Copyright © 2022 {CONFIG.NFT_NAME}
          </s.TextP>
            </s.SecContainer>




        <s.SpacerMedium />
      </s.Container>
    </s.Screen>
  );
}

export default App;
