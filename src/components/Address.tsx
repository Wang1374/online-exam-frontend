import { useMemo} from 'react';
import { Cascader, Input, CascaderProps, InputProps } from 'antd';
const chinaAreaJson = require('china-area-data');
interface Option {
    value: string;
    label: string;
    children?: Option[];
}

function getOptions(): Option[] {
    const provinceObj = chinaAreaJson['86'];
    const loop = (obj: Record<string, string>): Option[] => {
        if (!obj) return [];

        return Object.keys(obj).map((key) => {
            return { label: obj[key], value: key, children: loop(chinaAreaJson[key]) } as Option;
        });
    };

    return loop(provinceObj);
}

export interface IAddress {
    areas: string[];
    street: string;
}
// 解析住址字符串
export function parseAddress(addr: string): IAddress {
    const [area, street] = addr.split('|');
    const areas = area.split(',');

    return {
        areas,
        street,
    };
}

// 按规则格式化地址
export function formatter({ areas, street }: IAddress): string {
    return areas.join(',') + '|' + street;
}

interface IProps {
    value?: IAddress;
    onChange?: (value: IAddress) => void;
    cascaderStyle?: React.CSSProperties;
    inputStyle?: React.CSSProperties;
    [key: string]: any;
}

export const Address: React.FC<IProps> = ({ value, onChange, cascaderStyle, inputStyle }) => {
    //放到内存里面，形成组建记忆， 组件每次render的时候组件不会更新option的值，
    const options = useMemo(getOptions, []);

    const onCascaderChange: CascaderProps<Option>['onChange'] = (areas: (string | number)[]) => {
        onChange?.({ street: value?.street || '', areas: (areas as string[]) || [] });
    };
    const onInputChange: InputProps['onChange'] = (e) => {
        onChange?.({ street: e.target.value || '', areas: value?.areas || [] });
    };

    return (
        <div style={{ display: 'flex'}}>
            <Cascader
                style={{ width: 200, ...cascaderStyle }}
                value={value?.areas}
                onChange={onCascaderChange}
                options={options}
                placeholder='请选择'
            />
            <Input style={{ flex: 1, marginLeft: 8, ...inputStyle }} 
            value={value?.street} 
            onChange={onInputChange} 
            placeholder='请输入家庭住址'
            />
        </div>
    );
};
