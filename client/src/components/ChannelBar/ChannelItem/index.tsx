import React from "react";
import { Channel } from "../../../types";

type Props = {
  channel: Channel;
};

const ChannelItem: React.FunctionComponent<Props> = ({ channel }) => {
  return (
    <div className="Container">
      <div className="ChannelIcon"></div>
    </div>
  );
};

export default ChannelItem;
