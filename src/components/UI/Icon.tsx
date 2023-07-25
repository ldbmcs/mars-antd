import React from "react";
import icons from "@@/plugin-layout/icons";

const Icon = (props: { icon: string }) => {
  const { icon } = props;
  const antIcon: { [key: string]: any } = icons;
  return React.createElement(antIcon[icon])
}
export default Icon
