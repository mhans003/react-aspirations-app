const Message = (props) => {

    const getStyle = (props) => {
        //Create a base "alert" class for this alert.
        let baseClass = "alert ";

        //Depending on message type, give appropriate color class.
        if(props.message.msgError) {
            baseClass += "alert-danger";
        } else {
            baseClass += "alert-primary";
        }

        //Return with text-center.
        return baseClass + " text-center";
    };

    return (
        <div className={getStyle(props)} role="alert">
            {props.message.msgBody}
        </div>
    );
};

export default Message;