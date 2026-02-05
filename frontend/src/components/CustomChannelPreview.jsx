import React from "react";

const CustomChannelPreview = ({ channel, activeChannel, setActiveChannel }) => {
    const isActive = activeChannel?.id === channel.id;

    return (
        <div
            className={`channel-preview ${isActive ? "active" : ""}`}
            onClick={() => setActiveChannel(channel)}
            style={{ padding: "10px", cursor: "pointer", borderBottom: "1px solid #eee" }}
        >
            <div className="channel-preview__content">
                <span className="channel-preview__content-name">
                    {channel.data?.name || channel.data?.id || "Unnamed Channel"}
                </span>
            </div>
        </div>
    );
};

export default CustomChannelPreview;
