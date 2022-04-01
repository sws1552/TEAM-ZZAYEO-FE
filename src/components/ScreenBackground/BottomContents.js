import React from "react";
import styled from "styled-components";
import { ReactComponent as Prise1Img } from "../../shared/svg/img_prise1.svg";
import { ReactComponent as Prise2Img } from "../../shared/svg/img_prise2.svg";
import { ReactComponent as Prise3Img } from "../../shared/svg/img_prise3.svg";
import { ReactComponent as EventImg } from "../../shared/svg/img_event.svg";

const BottomContents = (props) => {
  const step = [
    {
      num: "Step 1",
      text: '"여행기 작성"에서 새로운 여행을 만들고 세부 여행을 작성합니다.',
    },
    {
      num: "Step 2",
      text: '작성한 여행에서 "모두에게 공유" 클릭',
    },
    {
      num: "Step 3",
      text: "아래 구글 폼으로 들어가 이벤트 참여 내용을 작성하면 끝!",
    },
  ];

  const prise = [
    {
      priseName: "짜여상",
      image: "../../images/gift01.png",
      text: "스타벅스 아이스아메리카노(30명)",
    },
    {
      priseName: "베스트 여행상",
      image: "../../images/gift02.png",
      text: "BBQ 황금올리브 + 콜라 세트 (5명)",
    },
    {
      priseName: "베스트 피드백상",
      image: "../../images/gift03.png",
      text: "베스킨라빈스 파인트 (5명)",
    },
  ];

  return (
    <React.Fragment>
      <Container>
        <Contents>
          <EventTitle>
            <EventCon>
              <p>Event</p>
            </EventCon>
            <Title>여행 자랑하고 상품 받짜여 🎁</Title>
          </EventTitle>
          <EventTerm>
            <p>참여기간</p>
            <Term>22. 3. 31(목) ~ 4. 6(수)</Term>
          </EventTerm>
          <EventWay>
            <p>참여방법</p>
            <WayBox>
              {step.map((s, i) => {
                return (
                  <Box>
                    <Step>{s.num}</Step>
                    {s.num === "Step 3" ? (
                      <div>
                        <Text>{s.text}</Text>
                        <Btn
                          onClick={() => {
                            window.open(
                              "https://docs.google.com/forms/d/e/1FAIpQLSeZWIQup3DBS4Ou7UEhZJfMln2-k0oIrIIh5uiyfX3ywh2lOA/viewform?usp=sf_link"
                            );
                          }}
                        >
                          구글 폼으로 이동 >
                        </Btn>
                      </div>
                    ) : (
                      <Text>{s.text}</Text>
                    )}
                  </Box>
                );
              })}
            </WayBox>
          </EventWay>
          <EventGuide>
            <p>참여안내</p>
            <GuideBox>
              {prise.map((s, i) => {
                return (
                  <Box1>
                    <Step>{s.priseName}</Step>
                    <Image src={s.image}></Image>
                    <Text1>{s.text}</Text1>
                  </Box1>
                );
              })}
            </GuideBox>
          </EventGuide>
        </Contents>
        <BottomImg>
          <EventImg />
        </BottomImg>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  position: absolute;
  bottom: 0;

  @media (max-width: 540px) {
    justify-content: center;
  }

  @media (max-width: 1579px) and (min-width: 541px) {
    justify-content: flex-start;
    left: 100px;
    top: 403px;
  }

  @media (min-width: 1580px) {
    left: 395px;
    top: 403px;
  }
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
`;

const EventTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const EventCon = styled.div`
  background: #b8f16f;
  border-radius: 4px;
  padding: 8px 13px;
  margin-right: 20px;

  p {
    margin: 0;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: -0.02em;
    color: #4e49e2;
  }
`;

const Title = styled.div`
  align-items: center;
  font-weight: 600;
  font-size: 40px;
  line-height: 47px;
  letter-spacing: -0.02em;
  color: #4e49e2;
`;

const EventTerm = styled.div`
  margin-top: 21px;
  display: flex;
  align-items: center;

  p {
    margin: 0;
    font-weight: 700;
    font-size: 18px;
    line-height: 30px;
    letter-spacing: -0.02em;
    color: #4e49e2;
    margin-right: 24px;
  }
`;

const Term = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 30px;
  letter-spacing: -0.02em;
  color: #212121;
`;

const EventWay = styled.div`
  margin-top: 19px;
  display: flex;
  align-items: flex-start;

  p {
    margin: 9;
    margin-right: 20px;
    font-weight: 700;
    font-size: 18px;
    line-height: 30px;
    letter-spacing: -0.02em;
    color: #4e49e2;
  }
`;

const WayBox = styled.div`
  display: flex;
  justify-content: center;
`;

const Box = styled.div`
  width: 200px;
  height: 200px;
  margin-right: 16px;
  background: #fafafa;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.02), 0px 4px 6px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`;

const Step = styled.div`
  text-align: center;
  padding: 10px;
  font-weight: 700;
  font-size: 18px;
  line-height: 30px;
  letter-spacing: -0.02em;
  color: #8f8cf1;
`;

const Text = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  letter-spacing: -0.02em;
  color: #212121;
  padding: 0px 22px;
  word-break: keep-all;
  display: flex;
  justify-content: center;
`;

const Text1 = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  letter-spacing: -0.02em;
  color: #212121;
  padding: 0px 19px;
  word-break: keep-all;
  margin-top: 12px;
`;

const Btn = styled.div`
  background: #4e49e2;
  border-radius: 8px;
  margin: 11px 19px 0px;
  padding: 15px 27px;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  letter-spacing: -0.02em;
  color: #ffffff;
  cursor: pointer;
`;
const EventGuide = styled(EventWay)``;

const GuideBox = styled(WayBox)``;

const Box1 = styled(Box)`
  height: 180px;
`;

const Image = styled.img`
  text-align: center;
  margin-top: 12px;
  display: block;
  margin: auto;
`;

const BottomImg = styled.div`
  position: relative;
  margin-top: 36px;
  left: 110px;
  bottom: 0px;
`;

export default BottomContents;
