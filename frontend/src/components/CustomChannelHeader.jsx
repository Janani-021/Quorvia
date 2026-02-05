import React from "react";
import { useChannelStateContext } from "stream-chat-react";

const CustomChannelHeader = () => {
    const { channel } = useChannelStateContext();

    return (
        <div className="channel-header__container">
            <div className="channel-header__left">
                <p className="channel-header__text">
                    {channel?.data?.name || channel?.data?.id || "Channel"}
                </p>
            </div>
        </div>
    );
};

export default CustomChannelHeader;
