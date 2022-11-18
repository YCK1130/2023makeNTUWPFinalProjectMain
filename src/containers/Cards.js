import {
    EditOutlined,
    MinusCircleOutlined,
    PlusCircleOutlined,
} from "@ant-design/icons";
import { margin } from "@mui/system";
import { Avatar, Card, InputNumber } from "antd";

const { Meta } = Card;

const Number = () => {
    return <div>1</div>;
};

const Cards = (props) => {
    const boardName = props.boardName;
    const description = props.des;

    return (
        <Card
            hoverable="true"
            style={{ width: 200, margin: "3px" }}
            cover={
                <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
            }
            actions={[
                <MinusCircleOutlined key="minus" />,
                <InputNumber />,
                <PlusCircleOutlined key="plus" />,
            ]}
        >
            <Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={boardName}
                description={description}
            />
            {/* <InputNumber addonBefore={<MinusCircleOutlined />} addonAfter={<PlusCircleOutlined />} defaultValue={0} /> */}
        </Card>
    );
};

export default Cards;
