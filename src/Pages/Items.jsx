import React from 'react';

import Navbar from "../Extras/navbar";
import Sidebar from "../Extras/sidebar";
import ProfileDropdown from "../Extras/dropdown";
import Home from "./Home";

export default function Items() {
//   const navigate = useNavigate();
    return(
        <>
        <Navbar/>
        <Sidebar />
        <ProfileDropdown />
        <Home />
  <div class="container mx-auto ml-32 mt-8">
    <div class="container flex justify-center">
    <div class="overflow-x-auto"> 
    <table class="w-full mt-12 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-red-900 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                     ITEM DESCRIPTION
                </th>
                <th scope="col" class="px-6 py-3">
                    PROPERTY TAG
                </th>
                <th scope="col" class="px-6 py-3">
                    ACCOUNTABLE PERSON
                </th>
                <th scope="col" class="px-6 py-3">
                    DESIGNATION
                </th>
                <th scope="col" class="px-6 py-3">
                    QUANTITY
                </th>
                <th scope="col" class="px-6 py-3">
                    UNIT COST
                </th> 
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    1
                </th>
                <td class="px-6 py-4">
                    A
                </td>
                <td class="px-6 py-4">
                    B
                </td>
                <td class="px-6 py-4">
                    C
                </td>
                <td class="px-6 py-4">
                    D
                </td>
                <td class="px-6 py-4">
                    E
                </td>            
            </tr>            
        </tbody>
    </table>
</div>
</div>
</div>          
        </>
    );
};

