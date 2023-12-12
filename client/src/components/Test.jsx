
const [category, setCategory] = useState('Food');
const [name, setName] = useState('');
const [amount, setAmount] = useState(0);

function handleSubmit(e) {
    e.preventDefault();
    console.log(category, name, amount)
}

<div className="container py-4">
    <div className="row">
        <div className="col-6 mx-auto text-center">
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" className='my-2 form-control' value={name} onChange={(e) => { setName(e.target.value) }} />
                <input type="number" placeholder="Amount" className='my-2 form-control' onChange={(e) => { setAmount(e.target.value) }} />
                <div>
                    <select className='my-2 form-control' onChange={(e) => { setCategory(e.target.value) }}>
                        <option>Food</option>
                        <option>Entertainment</option>
                    </select>
                </div>
                <button type='submit'>Add</button>
            </form>
        </div>
    </div>
</div>