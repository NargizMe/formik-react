import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';

function App() {
  const [category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState('');

  useEffect(() => {
    (async() => {
      const result = await axios('https://northwind.vercel.app/api/categories');
      setCategory(result.data);
    })()
  }, [])

  function handleOptionClick(e){
    // setCategoryId(e.target.value)
    // console.log(va);
  }

  return (
    <div>
     <h1>Add Product Form</h1>
     <h2>{categoryId}</h2>
     <Formik
       initialValues={{ name: '', categoryId: '', unitPrice: '', unitsInStock: '', unitsOnOrder: '', discontinued: '',reorderLevel: '', quantityPerUnit: '', categoryId: '' }}
       onSubmit={async(values) => {
        await axios.post('https://northwind.vercel.app/api/products', values)
        setCategoryId(values.categoryId);
        console.log(values);
       }}
     >
      <Form>
        <Field as="select" name="categoryId">
          {
            category.map((el) => {
              return <option value={el.id} key={el.id}>{el.name}</option>
            })
          }
        </Field>
        <Field type="text" name="name" placeholder = 'name' />
        <Field type="text" name="unitPrice" placeholder = 'unitPrice'/>
        <Field type="text" name="unitsInStock" placeholder = 'unitsInStock' />
        <Field type="text" name="unitsOnOrder" placeholder = 'unitsOnOrder' />
        <Field type="text" name="discontinued" placeholder = 'discontinued' />
        <Field type="text" name="reorderLevel" placeholder = 'reorderLevel' />
        <Field type="text" name="quantityPerUnit" placeholder = 'quantityPerUnit' />
        <button type="submit" >
          Submit
        </button>
      </Form>
     </Formik>
   </div>
  );
}

export default App;
