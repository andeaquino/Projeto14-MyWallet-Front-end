import { IoArrowDown } from "react-icons/io5";
import { useState } from "react/cjs/react.development";
import styled from "styled-components";

const Select = ({ selectedOption, setSelectedOption, options, label}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SelectContainer
      onClick={() => setIsOpen(!isOpen)}
      isOpen={isOpen}
    >
      <ExamSelect option={selectedOption}>
        <p> {selectedOption ? selectedOption.name : label}</p>
        <IoArrowDown
          size={25}
          color="#003"
          className={isOpen ? "show-options" : "show-options active"}
        />
      </ExamSelect>
      {
        <OptionsContainer isOpen={isOpen}>
          {options.map((opt) => (
            <Option
              key={opt.id}
              onClick={() => {
                setSelectedOption(opt);
                setIsOpen(false);
              }}
              isOpen={isOpen}
            >
              {opt.name}
            </Option>
          ))}
        </OptionsContainer>
      }
    </SelectContainer>
  );
}


export default Select;


const SelectContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: auto;
  overflow: hidden;
  margin-bottom: 15px;
  color: #000000;
  font-size: 20px;
  font-family: "Raleway", sans-serif;

  .show-options {
    position: absolute;
    top: 19px;
    right: 15px;
    transition: all 0.4s;
    transform: ${(props) => (props.isOpen ? "rotateX(-180deg)" : "none")};
  }
`;

const ExamSelect = styled.div`
  cursor: pointer;
  padding: 15px;
  padding-top: 18px;
  width: 100%;
  height: 58px;
  background-color: #fff;
  outline: none;
  border: none;
  border-radius: 5px;
`;

const OptionsContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 200px;
  overflow-y: scroll;
  transition: all 0.4s;
  transform: ${({isOpen}) => (isOpen ? "scaleY(1)" : "scaleY(0)")};
  transform-origin: top;
  height: auto;
  border-radius: 5px;
`;

const Option = styled.div`
  cursor: pointer;
  flex-shrink: 0;
  opacity: ${({isOpen}) => (isOpen ? "1" : "0")};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 15px;
  width: 100%;
  transition: all 0.4s;
  height: ${({isOpen}) => (isOpen ? "50px" : "0px")};
  background: ${({isOpen}) => (isOpen ? "rgba(120, 120, 120, 0.3)" : "")};
  background-color: #DADADA;

  :hover {
    background: rgba(120, 120, 120, 0.5);
  }
`;
