import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

function App() {
  const [category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState('');

  useEffect(() => {
    (async() => {
      const result = await axios('https://northwind.vercel.app/api/categories');
      setCategory(result.data);
    })()
  }, [])

   
  const addProduct = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    unitPrice: Yup.number()
      .required('Required'),
    unitsInStock: Yup.number()
      .required('Required'),
    quantityPerUnit: Yup.number()
    .required('Required'),
  });

  return (
    <div>
     <h1>Add Product Form</h1>
     <h2>{categoryId}</h2>
     <Formik
       initialValues={{ name: '', categoryId: '', unitPrice: 0, unitsInStock: 0, unitsOnOrder: '', discontinued: false, reorderLevel: '', quantityPerUnit: '', categoryId: '' }}
       validationSchema={addProduct}
       onSubmit={async(values) => {
        await axios.post('https://northwind.vercel.app/api/products', values)
        setCategoryId(values.categoryId);
       }}
     >
      {({ errors, touched }) => {
        return <Form>
          <Field as="select" name="categoryId">
            {
              category.map((el) => {
                return <option value={el.id} key={el.id}>{el.name}</option>
              })
            }
          </Field>
          <Field type="text" name="name" placeholder = 'name' />
          {
            errors.name && <span style={{color:'tomato'}}>{errors.name}</span>
          }
          <Field type="number" name="unitPrice" placeholder = 'unitPrice'/>
          {
            errors.unitPrice && <span style={{color:'tomato'}}>{errors.unitPrice}</span>
          }
          <Field type="number" name="unitsInStock" placeholder = 'unitsInStock' />
          {
            errors.unitsInStock && <span style={{color:'tomato'}}>{errors.unitsInStock}</span>
          }
          <Field type="text" name="unitsOnOrder" placeholder = 'unitsOnOrder' />
          <Field type="checkbox" name="discontinued" />
          <Field type="text" name="reorderLevel" placeholder = 'reorderLevel' />
          <Field type="text" name="quantityPerUnit" placeholder = 'quantityPerUnit' />
          {
            errors.quantityPerUnit && <span style={{color:'tomato'}}>{errors.quantityPerUnit}</span>
          }
          <button type="submit" >
            Submit
          </button>
        </Form>
        }}
     </Formik>
   </div>
  );
}

export default App;
