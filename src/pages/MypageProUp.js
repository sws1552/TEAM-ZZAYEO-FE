import React, { useRef } from "react";
import styled from "styled-components";
import Header from "../components/Mypage/Header";
import { actionCreators as userActions } from "../redux/modules/user";
import { useDispatch, useSelector } from "react-redux";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import { actionCreators as mypageActions } from "../redux/modules/mypage";

const MypageProUp = () => {
  const dispatch = useDispatch();

  const checkUser = useSelector((state) => state.user.user);

  const myPreview = useSelector((state) => state.mypage.myPreview);

  const [upNickName, setNickName] = React.useState("");

  React.useEffect(() => {
    dispatch(userActions.checkUserDB());

    return () => {
      dispatch(mypageActions.setpreview(null));
    };
  }, [dispatch]);

  React.useEffect(() => {
    setNickName(checkUser.nickname);
  }, [checkUser]);

  const fileRef = useRef(null);

  const selectFile = (e) => {
    let file_kind = e.target.value.lastIndexOf(".");
    let file_name = e.target.value.substring(
      file_kind + 1,
      e.target.value.length
    );
    let file_type = file_name.toLowerCase();

    let check_file_type = ["jpg", "gif", "png", "jpeg"];

    if (check_file_type.indexOf(file_type) === -1) {
      window.alert("사진만 업로드 가능합니다!");
      e.target.value = "";
      return false;
    }

    const reader = new FileReader();
    const file = fileRef.current.files[0];

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      // console.log('reader.result !! ', reader.result);
      dispatch(mypageActions.setpreview(reader.result));
    };
  };

  const userInfoSave = () => {
    const newImg = fileRef.current.files[0];

    dispatch(mypageActions.updateProfileFB(newImg, upNickName));
  };

  return (
    <MypageCon>
      <Header title="프로필 수정" showBack={true} />
      <UserCon>
        <Label htmlFor="ex_file">
          {myPreview ? (
            <UserImg userImg={myPreview} />
          ) : (
            <UserImg userImg={checkUser.userImg} />
          )}
        </Label>
        <FileInput
          id="ex_file"
          accept="image/jpg, image/png, image/jpeg, image/gif"
          type="file"
          onChange={selectFile}
          ref={fileRef}
        />
      </UserCon>

      <InputBar>
        <InputRe
          placeholder="닉네임을 입력해주세요."
          maxlength="10"
          value={upNickName ? upNickName : ""}
          onChange={(e) => setNickName(e.target.value)}
        />
        <ClearIconRe onClick={() => setNickName("")} />
      </InputBar>
      <Text>
        <ErrorOutlineOutlinedIcon />
        닉네임은 한글, 영어, 숫자로 00자까지 입력해주세요.
      </Text>

      <BtnCon>
        <SaveBtn
          style={{
            backgroundColor:
              upNickName && upNickName.length !== 0 ? "#4E49E2" : null,
          }}
          onClick={userInfoSave}
        >
          저장하기
        </SaveBtn>
      </BtnCon>
    </MypageCon>
  );
};

const Label = styled.label`
  cursor: pointer;
`;

const FileInput = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;

const MypageCon = styled.div`
  width: 100%;
  height: 92%;
  /* background-color: orange; */
  padding: 25px 0;
  box-sizing: border-box;
`;

const UserCon = styled.div`
  /* background-color: orange; */
  width: 100%;
  height: 25vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserImg = styled.div`
  background-image: url(${(props) =>
    props.userImg
      ? props.userImg
      : "https://opgg-com-image.akamaized.net/attach/images/20200225141203.297146.jpg?image=w_200"});
  background-position: center;
  background-size: cover;
  /* box-shadow: 0 7px 5px 0 #BFBFBF; */
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;

const InputBar = styled.div`
  /* background-color: orange; */
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
`;

const ClearIconRe = styled(ClearIcon)`
  position: absolute;
  right: 30px;
  top: 25px;
  cursor: pointer;
`;

const InputRe = styled.input`
  width: 90%;
  padding: 20px 0;
  text-align: center;
  border: none;
  border-bottom: 2px solid #bdbdbd;
  font-size: 20px;

  &:focus {
    outline: none;
  }
`;

const Text = styled.div`
  margin-top: 10px;
  color: #bdbdbd;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
`;

const BtnCon = styled.div`
  /* background-color: orange; */
  width: 100%;
  height: 46vh;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const SaveBtn = styled.div`
  background-color: #bdbdbd;
  color: white;
  width: 80%;
  text-align: center;
  padding: 20px;
  border-radius: 10px;
  cursor: pointer;
`;

export default MypageProUp;
