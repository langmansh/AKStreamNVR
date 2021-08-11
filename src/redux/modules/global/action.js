export const FETCH_ENUMS = 'FETCH_ENUMS';

export const fetchEnums = () => {
    return {
        type: `${FETCH_ENUMS}`,
        payload: new Promise((resolve, reject) => {
            resolve({
                    code: 200,
                    data: [
                        {
                            "enumType": "OrganizationLevel",
                            "enums": [
                                {"enumName": "UNKNOW", "enumDesc": "未知", "enumColor": ""},
                                {"enumName": "COUNTRY", "enumDesc": "国家", "enumColor": ""},
                            ]
                        }
                    ]
                }
            )
        })

    }
}
