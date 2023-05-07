import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index.js";
import {Pagination} from "react-bootstrap";
import PagesLimit from "./PagesLimit";
import checkTypesBrandsPrices from "../checkTypesBrandsPrices";
import sortList from "../SortBar/SortList/SortList";

const Pages = observer(() => {
    const {device,optionDevice} = useContext(Context)
    useEffect(() => {

        //set the number of required pages to download and in first loading in Shop.js
        device.setChangedDevices(device.devices)
        checkTypesBrandsPrices(device, optionDevice)
        if(optionDevice.sortOptions.sortOption.length > 0){
            sortList(device,optionDevice.sortOptions.sortOption)
        }
        PagesLimit(device,optionDevice)

    }, [device.page])

    const pageCount = Math.ceil(device.totalCount / device.limit)
    const pages = []
    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }

    return (
        <Pagination className="mt-3" style={{marginLeft: 4}}>
            {pages.map(page =>
                <Pagination.Item
                    key={page}
                    active={device.page === page}
                    onClick={() => {
                        device.setPage(page)
                    }

                }
                >
                    {page}
                </Pagination.Item>
            )}
        </Pagination>
    );
});

export default Pages;
