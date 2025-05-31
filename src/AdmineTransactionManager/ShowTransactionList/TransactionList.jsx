
import {GridComponent,ColumnDirective,ColumnsDirective} from "@syncfusion/ej2-react-grids";
import { DeleteTrasnaction, GetAllTransactions } from "../../APIs/Transaction";
import Styles from "./TransactionList.module.css"
import { useEffect, useState} from "react";
import { useLoaderData,useNavigate } from "react-router-dom";

import '@syncfusion/ej2-base/styles/material.css';  
import '@syncfusion/ej2-buttons/styles/material.css';  
import '@syncfusion/ej2-calendars/styles/material.css';  
import '@syncfusion/ej2-dropdowns/styles/material.css';  
import '@syncfusion/ej2-inputs/styles/material.css';  
import '@syncfusion/ej2-navigations/styles/material.css';
import '@syncfusion/ej2-popups/styles/material.css';
import '@syncfusion/ej2-splitbuttons/styles/material.css';
import '@syncfusion/ej2-notifications/styles/material.css';
import "@syncfusion/ej2-react-grids/styles/material.css";

export default function TransactionList(){


    const [DataSource, setDataSource] = useState([]);
    const [Message, setMessage] = useState("");
    const [columns, setColumns] = useState([]);
    const [TransactionArry] = useState(useLoaderData());
    const [blockActions,setBlockActions]=useState(false);
    const Navigate=useNavigate()

    useEffect(() => {
        if (TransactionArry !== null) {
            if (TransactionArry?.state === 1) {
                const data = TransactionArry?.Data;
                setDataSource(data);
                
                // Generate columns automatically from the first item in the array
                if (data && data.length > 0) {
                    const generatedColumns = Object.keys(data[0]).map(key => ({
                        field: key,
                        headerText: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize first letter
                        width: '150'
                    }));
                    setColumns(generatedColumns);
                }
            } else {
                setMessage(TransactionArry?.message);
            }
        } else {
            setMessage("There are no transactions to load");
        }
    }, [TransactionArry]);

    
    const  handleDelete = async(rowData) => {
        // Get the first value of the row
        setBlockActions(true);
        const ID = rowData.id;

        const DeleteResult=await DeleteTrasnaction(ID);

        if(DeleteResult?.state===1){

            const LoadData=await GetAllTransactions();
            setDataSource(LoadData?.Data||[])
        }
        else{
            setMessage(DeleteResult?.message)
        }
        setBlockActions(false);
        // You can also access specific fields if you know them
        // const transactionId = rowData.transactionId;
    };


    
    const  handleShowDetails = async(rowData) => {

        // Get the first value of the row

        const TransactionData={
            Id:rowData.id,
            PaymentMethodID:rowData.paymentMethodID,
            state:rowData.state,
            TotolePrice:rowData.totolePrice,
            CustomerID:rowData.customerID,
            TransactionGUID:rowData.transactionGUID,
            TransactionDate:rowData.transactionDate
        }

        setBlockActions(true);

        Navigate(`ShowTransactionDetails?ID=${TransactionData.Id}`,{state:TransactionData})
        
        setBlockActions(false);


    };

 
    return (<>

     {Message&&<h2>{Message}</h2>}
    <GridComponent dataSource={DataSource} allowSorting={true} >
        

        <ColumnsDirective>
                    {/* Auto-generated columns */}
                    {columns.map((col) => (
                        <ColumnDirective 
                            key={col.field}
                            field={col.field}
                            headerText={col.headerText}
                            width={col.width}
                        />
                    ))}
                    
                    {/* Single button column */}
                    <ColumnDirective 
                        headerText="Delete"
                        width="120"
                        template={(props) => (
                            <button  disabled={blockActions}
                                onClick={() => handleDelete(props)}
                                className={Styles.btnDelete}
                            >
                                {blockActions?"Loading...": "x"}
                            </button>
                        )}

                    />
               <ColumnDirective 
                headerText="Show Details"
                        width="150"
                        template={(props) => (
                            <button  disabled={blockActions}
                                onClick={() => handleShowDetails(props)}
                                className={Styles.btn}
                            >
                                {blockActions?"Loading...": "Show Details"}
                            </button>
                        )}
                        
                    />
                </ColumnsDirective>

    </GridComponent>
     
</>
    )

}

    
    








export async function Loader(){

           return await  GetAllTransactions() 

}

