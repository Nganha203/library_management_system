import { Select } from 'antd';

const SelectPlayout = (props) => {
    const { onChange } = props;
    return (
        <div style={{ width: "100%", textAlign: "center" }}>
            <Select
                placeholder="Category"
                style={{
                    width: 120,
                }}
                onChange={onChange}
                options={[
                    {
                        value: 'novel',
                        label: 'Novel',
                    },
                    {
                        value: 'mafia',
                        label: 'Mafia',
                    },
                    {
                        value: 'swordplay',
                        label: 'Swordplay',
                    },
                    {
                        value: 'detective',
                        label: 'Detective',
                    },
                    {
                        value: 'children',
                        label: 'Children',
                    },
                    {
                        value: 'mentality',
                        label: 'Mentality',
                    },
                    {
                        value: 'horrified',
                        label: 'Horrified',
                    },
                ]}
            />
        </div>
    );
};

export default SelectPlayout;
