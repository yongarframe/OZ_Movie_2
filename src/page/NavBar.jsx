import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useDebounce from "../customHooks/useDebounce";
import NavbarPcView from "../component/NavbarPcView";
import NavbarMobileView from "../component/NavbarMobileView";

export default function NavBar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const debounceValue = useDebounce(search, 1000);
  const { userInfo, setUserInfo } = useUserInfo();
  // const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    if (debounceValue) {
      navigate(`/search?movie=${debounceValue}`);
    } else {
      // navigate(`/`);  // 적용 시 구글로그인 시 local data 사라짐
    }
  }, [debounceValue]);

  // useEffect(() => {
  //   const fetchUserInfo = async () => {
  //     const userInfo = await getUserInfo();
  //     setIsLogin(userInfo);
  //     setUserInfo(userInfo.user);
  //   };
  //   fetchUserInfo();
  // }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isMobile ? (
        <NavbarMobileView
          setSearch={setSearch}
          userInfo={userInfo}
          useImageUrl={userInfo?.user?.profileImageUrl}
          setUserInfo={setUserInfo}
        />
      ) : (
        <NavbarPcView
          setSearch={setSearch}
          userInfo={userInfo}
          useImageUrl={userInfo?.user?.profileImageUrl}
          setUserInfo={setUserInfo}
        />
      )}
    </>
  );
}
