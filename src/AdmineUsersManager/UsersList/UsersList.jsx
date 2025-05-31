

import {GridComponent,ColumnDirective,ColumnsDirective} from "@syncfusion/ej2-react-grids";
import {DeleteUser, GetAllUsers} from "../../APIs/Users.js"
import { useEffect, useState} from "react";
import { useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
import Styles from "./UsersList.module.css"

export default function UsersList(){


     const [DataSource, setDataSource] = useState([]);
    const [Message, setMessage] = useState("");
    const [columns, setColumns] = useState([]);
    const [loaderData,setLoadData] = useState(useLoaderData());
    const [blockAction,setBlockAction]=useState(false);
    const navigate=useNavigate();
    useEffect(() => {
        if (loaderData !== null) {
            if (loaderData?.state === 1) {
                const data =  loaderData.Data.map((User)=>({

                    userID:User.userID,
                    personID:User.personID,
                    userRole:User.userRole===1?"Admine":User.userRole===2?"Customer":"AthorizedUser",
                    userAtherization:User.userAtherization,
                    userName:User.userName,
                    userPassword:User.userPassword,
                    createdAt:User.createdAt,
                    firstName:User.person.firstName,
                    lastName:User.person.lastName,
                    email:User.person.email,
                    phone:User.person.phone,
                    country:User.person.country,
                    city:User.person.city,
                    postCodeAndLocation:User.person.postCodeAndLocation,
         
                })
                    
                );

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
                setMessage(loaderData?.message);
            }
        } else {
            setMessage("There are no transactions to load");
        }
    }, [loaderData]);

    
    const handleShowDetails = async(User) => {
   //Create a new UI to Show Details and requer an spesfic set up for athorization 
    //(show a list of the user othorizations building the arry based on the Athorization byte)
    //
const Data={

                    userID:User.userID,
                    PersonID:User.personID,
                    userRole:User.userRole,
                    userAtherization:User.userAtherization,
                    userName:User.userName,
                    userPassword:User.userPassword,
                    createdAt:User.createdAt,
                    firstName:User.firstName,
                    lastName:User.lastName,
                    email:User.email,
                    phone:User.phone,
                    country:User.country,
                    city:User.city,
                    postCodeAndLocation:User.postCodeAndLocation,
         
                }
                    setBlockAction(true);

        navigate("ShowUserDetails",{state:Data})
        
    setBlockAction(false);

    };


   
   const handleUpdate = async(User) => {
   //Create a new UI to Show Details and requer an spesfic set up for athorization 
    //(show a list of the user othorizations building the arry based on the Athorization byte)
    //
       const Data={

                    userID:User.userID,
                    PersonID:User.personID,
                    userRole:User.userRole,
                    userAtherization:User.userAtherization,
                    userName:User.userName,
                    userPassword:User.userPassword,
                    createdAt:User.createdAt,
                    firstName:User.firstName,
                    lastName:User.lastName,
                    email:User.email,
                    phone:User.phone,
                    country:User.country,
                    city:User.city,
                    postCodeAndLocation:User.postCodeAndLocation,
         
                }
                    setBlockAction(true);

        navigate("UpdateUser",{state:Data})
        
    setBlockAction(false);

    };


  

      const handleDelete =async(rowData) => {
        
 
        const ID = rowData.userID;
                        setBlockAction(true);

         const DeleteResult=await DeleteUser(ID);
        
                if(DeleteResult?.state===1){
        
                    const LoadData=await GetAllUsers();
                    setLoadData(LoadData||[])
                }
                else{
                    setMessage(DeleteResult?.message)
                }
                setBlockAction(false);
    };



    return (<>

     {Message&&<h2>{Message}</h2>}
    <GridComponent dataSource={DataSource} >
        

        <ColumnsDirective>
                    {columns.map((col) => (
                        <ColumnDirective 
                            key={col.field}
                            field={col.field}
                            headerText={col.headerText}
                            width={col.width}
                        />
                    ))}
                    
                    <ColumnDirective 
                        headerText="Delete"
                        width="120"
                        template={(props) => (
                            <button  disabled={blockAction}
                                onClick={() => handleDelete(props)}
                                className={Styles.btnDelete}
                            >
                                {blockAction?"Loading..":"x"}
                            </button>
                        )}
                    />
                           <ColumnDirective 
                        headerText="Update"
                        width="120"
                        template={(props) => (
                            <button   disabled={blockAction}
                                onClick={() => handleUpdate(props)}
                                className={Styles.btn}
                            >
                                {blockAction?"Loading..":"Update"}
                            </button>
                        )}
                    />
                                  <ColumnDirective 
                        headerText="showDetails"
                        width="120"
                        template={(props) => (
                            <button   disabled={blockAction}
                                onClick={() => handleShowDetails(props)}
                                className={Styles.btn}
                            >
                                {blockAction?"Loading..":"showDetails"}
                            </button>
                        )}
                    />
                </ColumnsDirective>

    </GridComponent>
     
</>
    )

}

export async function Loader(){

           return await  GetAllUsers() 

}

