import { Typography } from "antd";
import { cyan } from "@ant-design/colors";
import React from "react";
import { Link } from "react-router-dom";
import { Nullable } from "../../../core/types";
import { IUser } from "../../User/model/types";

const { Title } = Typography;
interface Props {
  user: Nullable<IUser>;
}

export const LoginComponent = ({ user }: Props) => {
  const comp = (
    <>
      {!user ? (
        <Title level={4}>Вход</Title>
      ) : (
        <Link to="/" color={cyan[4]}>
          Начать игру
        </Link>
      )}
    </>
  );

  return <>{comp}</>;
};
