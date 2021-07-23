import React,{useState,useEffect} from 'react'

const initialForm = {
    name:"", country:"",id:null,
}

const CrudForm = ({createData,updateData,dataToEdit,setDataToEdit}) => {
    const [form, setForm] = useState(initialForm);
    useEffect(() => {
        if (dataToEdit){
            setForm(dataToEdit)
        }else{
            setForm(initialForm)
        }
    }, [dataToEdit])

    const handleChange = (e) =>{
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }
    const handleSubmit= (e) =>{
        e.preventDefault();
        if (!form.name || !form.country) {
            alert("Insert Values");
            return;
        }
        if (form.id === null){
            createData(form);
        }else{
            updateData(form)
        }
        handleReset();
    }
    const handleReset = (e) =>{
        setForm(initialForm);
        setDataToEdit(null);
    }

    return (
        <div>
            <h3>{dataToEdit ? "Edit": "ADD"}</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name"onChange={handleChange}
                value={form.name}/>
                <input type="text" name="country" placeholder="Country"onChange={handleChange}
                value={form.country}/>
                <input type="submit" value="Send" />
                <input type="submit" value="Clean" onClick={handleReset}/>
            </form>
        </div>
    )
}

export default CrudForm