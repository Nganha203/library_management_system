import { Input, Space } from "antd"
const { Search } = Input;

const SearchPlayout = (props) => {
    const { onSearch } = props
    return (
        <Space
            direction="vertical"
            style={{
                width: '100%',
            }}>
            <Search
                className="input-search"
                placeholder="Name book"
                onSearch={onSearch}
                allowClear
                enterButton
                style={{
                    width: "100%",
                }}
            />
        </Space>
    )

}

export default SearchPlayout