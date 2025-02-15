import { Input, Space } from "antd"
const { Search } = Input;

const SearchPlayout = (props) => {
    const { onSearch } = props
    const handleInputChange = (event) => {
        const value = event.target.value;
        onSearch(value); // Gọi hàm onSearch của cha với giá trị mới
    };
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