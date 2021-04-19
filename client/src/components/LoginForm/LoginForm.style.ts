import styled from "styled-components";
import { Field } from "formik";

interface FieldProps {
  error: string | undefined;
}

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background: #3d434f;
  padding: 25px 10px;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);
`;

export const Header = styled.div`
  color: #fff;
  margin-bottom: 10px;
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 25px;
  margin-bottom: 10px;
  font-weight: 800;
`;

export const Description = styled.p`
  font-size: 16px;
  margin: 0;
  color: #a3abb8;
`;

export const FormField = styled(Field)<FieldProps>`
  width: 295px;
  padding: 0 7px;
  font-size: 14px;
  display: flex;
  height: 28px;
  margin-bottom: 10px;
  border-radius: 5px;
  transition: 0.6s all ease-in-out;
  ${(props: FieldProps) => (props.error ? "border: 2px solid red" : "")};
`;

export const FormHeader = styled.div<FieldProps>`
  font-size: 12px;
  position: relative;
  font-weight: 500;
  padding: 5px 0px;

  color: ${(props: FieldProps) => (props.error ? "red" : "#A3ABB8")};
`;

export const FormError = styled.span<FieldProps>`
  visibility: ${(props: FieldProps) => (props.error ? "visible" : "hidden")};
  transition: 0.6s all ease-in-out;
  font-size: 12px;
  color: red;
  font-weight: 400;
  margin-left: 10px;
  position: relative;
  top: -1px;

  &::before {
    content: "-";
    margin-right: 10px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

export const SubmitButton = styled.button`
  border: none;
  border-radius: 5px;
  width: 100%;
  background-color: #738cbf;
  padding: 7px 14px;
  &:hover {
    filter: brightness(85%);
  }
`;

export const RegisterContainer = styled.div`
  position: relative;
  padding-top: 15px;
  display: flex;
  width: 100%;
`;

export const RegisterSubText = styled.div`
  font-size: 12px;
  color: #808b9d;
`;

export const Register = styled.span`
  padding-left: 5px;
  color: #738cbf;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    filter: brightness(85%);
  }
`;
