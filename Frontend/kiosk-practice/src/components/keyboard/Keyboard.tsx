import React, { useEffect, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { HangulImeInputWrapper } from "mole-virtual-keyboard";

const SearchContainer = styled.div`
  display: flex;
  width: 1000px;
  height: 100px;
  position: relative;
  border: 0;
  img {
    position: absolute;
    right: 10px;
    top: 10px;
  }
  margin-bottom: 700px;
  margin-left: 200px;
`;

const Search = styled.input`
  border: 0;
  padding-left: 10px;
  margin-left: 50px;
  background-color: #eaeaea;
  width: 100%;
  height: 100%;
  outline: none;
  font-size: 4rem;
`;

const AutoSearchContainer = styled.div`
  z-index: 3;
  height: 26vh;
  width: 940px;
  background-color: #fff;
  position: absolute;
  top: 100px;
  border: 2px solid;
  margin-left:45px;
  padding: 5px;
`;

const AutoSearchWrap = styled.ul``;
const AutoSearchData = styled.li`
  list-style: none;
  padding: 10px 8px;
  width: 100%;
  font-size: 50px;
  font-weight: bold;
  z-index: 4;
  letter-spacing: 2px;
  &:hover {
    background-color: #edf5f5;
    cursor: pointer;
  }
  position: relative;
  img {
    position: absolute;
    right: 5px;
    width: 18px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

let inputWrapper: HangulImeInputWrapper | undefined = undefined;
interface autoDatas {
  //api를 통해 받아온 데이터 interface
  title: any;
  author: any;
  index: any;
  cover: any;
  story: any;
  publish_date: any;
  genre: any;
  type: any;
  position: any;
  number_of_reviews: any;
  number_of_rental: any;
  content: any;
  isbn: any;
}
export default function VirtualKeyboard() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isHangul, setHangul] = useState(true);
  const [keyword, setKeyword] = useState<string>("");
  const onChangeData = (e: React.FormEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value);
  };
  const [keyItems, setKeyItems] = useState<autoDatas[]>([]);
  const fetchData = () => {
    return fetch(`http://i7d211.p.ssafy.io:8081/book/search?keyword`)
      .then((res) => res.json())
      .then((data) => data.slice(0, 100));
  };

  interface Book {
    includes(data: string): boolean;
    title?: any;
  }
  const updateData = async () => {
    const res = await fetchData();
    let b = res
      .filter((list: Book) => list.title.includes(keyword) === true)
      .slice(0, 4);
    setKeyItems(b);
  };
  useEffect(() => {
    const debounce = setTimeout(() => {
      if (keyword) updateData();
    }, 200);
    return () => {
      clearTimeout(debounce);
    };
  }, [keyword]); //키워드가 변경되면 api를 호출

  useEffect(() => {
    if (!inputRef.current) return;
    inputWrapper = new HangulImeInputWrapper(inputRef.current);
  }, []);

  return (
    <div>
      <form>
        <SearchContainer>
          <Search
            value={keyword}
            onChange={onChangeData}
            style={{boxShadow: '0px 0px 0px 3px black', borderRadius:30}}
            ref={inputRef}
            onSelect={() => {
              inputWrapper?.checkChangedSelect();
            }}
          />
          <IconButton
            type="submit"
            aria-label="search"
            onClick={() =>
              navigate("/book/searchresult", { state: { keyword } })
            }
          >
            <SearchIcon
              sx={{
                position: "absolute",
                width: 80,
                height: 80,
                marginRight: "150px",
              }}
            />
          </IconButton>
          {keyItems.length > 0 &&
            keyword && ( //키워드가 존재하고,해당키워드에 맞는 이름이 있을때만 보여주기
              <AutoSearchContainer>
                <AutoSearchWrap>
                  {keyItems.map((search, idx) => (
                    <AutoSearchData
                      key={search.title}
                      onClick={() => navigate(`/book/detail/${search.isbn}`)}
                    >
                      <span style={{ color: "black" }}>{search.title}</span>
                    </AutoSearchData>
                  ))}
                </AutoSearchWrap>
              </AutoSearchContainer>
            )}
        </SearchContainer>
      </form>

      <div style={{ backgroundColor: "#132154" }}>
        <div style={{ marginTop: 20, marginBottom: 20, marginBlock: 20 }}>
          <button
            onClick={() => {
              inputWrapper?.backspace();
            }}
          >
            ⌫
          </button>
          <button
            onClick={() => {
              setHangul(!isHangul);
            }}
          >
            🌐
          </button>
        </div>
        <div>
          <div style={{ display: isHangul ? "block" : "none" }}>
            <div>
              {"ㅃㅉㄸㄲㅆ".split("").map((val, idx) => {
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      inputWrapper?.insert(val);
                    }}
                  >
                    {val}
                  </button>
                );
              })}
            </div>
            <div>
              {"ㅂㅈㄷㄱㅅㅛㅕㅑㅐㅔ".split("").map((val, idx) => {
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      inputWrapper?.insert(val);
                    }}
                  >
                    {val}
                  </button>
                );
              })}
            </div>
            <div>
              {"ㅁㄴㅇㄹㅎㅗㅓㅏㅣ".split("").map((val, idx) => {
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      inputWrapper?.insert(val);
                    }}
                  >
                    {val}
                  </button>
                );
              })}
            </div>
            <div>
              {"ㅋㅌㅊㅍㅠㅜㅡ".split("").map((val, idx) => {
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      inputWrapper?.insert(val);
                    }}
                  >
                    {val}
                  </button>
                );
              })}
            </div>
            <button
              style={{ paddingInline: 200 }}
              onClick={() => {
                inputWrapper?.insert(" ");
              }}
            >
              SPACE
            </button>
          </div>
          <div style={{ display: isHangul ? "none" : "block" }}>
            <div>
              {"~!@#$%^&*()-".split("").map((val, idx) => {
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      inputWrapper?.insert(val);
                    }}
                  >
                    {val}
                  </button>
                );
              })}
            </div>
            <div>
              {"qwertyuiop".split("").map((val, idx) => {
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      inputWrapper?.insert(val);
                    }}
                  >
                    {val}
                  </button>
                );
              })}
            </div>
            <div>
              {"asdfghjkl".split("").map((val, idx) => {
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      inputWrapper?.insert(val);
                    }}
                  >
                    {val}
                  </button>
                );
              })}
            </div>
            <div>
              {"zxcvbnm".split("").map((val, idx) => {
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      inputWrapper?.insert(val);
                    }}
                  >
                    {val}
                  </button>
                );
              })}
            </div>
            <button
              style={{ paddingInline: 200 }}
              onClick={() => {
                inputWrapper?.insert(" ");
              }}
            >
              SPACE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
