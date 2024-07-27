import React, { useEffect, useState } from 'react';
import './emiCss.css';

export default function EMI() {
    const [assetCost, setAssetCost] = useState(0)
    const [ir, setIR] = useState(0)
    const [tenure, setTenure] = useState(0)
    const [downpayment, setDownPayment] = useState(0)
    const [loanVal, setLoanVal] = useState(0);
    const [emi, setEMI] = useState('');
    const [showResult,setShowResult]=useState(false);


    // Downpayment value function
    useEffect(() => {
        // setShowResult(false)
        const loan = (assetCost - downpayment);
        setLoanVal(loan);
        if(loan>0&& ir>0&& tenure>0){
            let monthInterest=ir/12/100;
            let numberOfPayments=tenure;
            let emiVal=(loan * monthInterest * Math.pow(1 + monthInterest, numberOfPayments)) /
            (Math.pow(1 + monthInterest, numberOfPayments) - 1);
            
            setEMI(emiVal.toFixed(2));
        }
    }, [assetCost, downpayment,ir,tenure])

    const handleSubmit=()=>{
        setShowResult(true)
    }
    
    const preventScroll = (e) => {
        e.target.blur()
        e.preventDefault();
    };


    return (
        <div className='holder'>
            <h1 className='heading'>EMI Calculator</h1>

            <div className='first-holder'>
                <p className='first'>Total Cost of Asset</p>
                <input type='number' className='no-input' placeholder='Enter 
            Cost of Asset...' value={assetCost} onChange={(e) => { setAssetCost(e.target.value) }} onWheel={(e)=>{preventScroll(e)}} />
            </div>

            <div className='first-holder'>
                <p className='first'>Annual Interest Rate {'(in %)'} </p>
                <input type='number' className='no-input' value={ir} onChange={(e) => { setIR(e.target.value) }} placeholder='Enter Interest Rate...' onWheel={(e)=>{preventScroll(e)}} />
            </div>

            <div className='first-holder'>
                <p className='first'>Down Payment</p>
                <input type='number' className='no-input' value={downpayment} onChange={(e) => { setDownPayment(e.target.value) }} placeholder='Enter Down Payment...' onWheel={(e)=>{preventScroll(e)}} />
            </div>

            <div className='first-holder'>
                <p className='first'>Tenure in Months</p>
                <input type='number' className='no-input' placeholder='Enter Tenure...' value={tenure} onChange={(e) => { setTenure((e.target.value)) }} onWheel={(e)=>{preventScroll(e)}}/>
            </div>

            <div className='tenure-emi-holder'>
                <div className='emi-holder'>
                    <p className='emi-first'>Total Loan :-</p>
                    <input className='emi-input' readOnly value={`₹ ${loanVal}`} placeholder='Total Monthly EMI...' />
                </div>

                <div className='emi-holder'>
                    <p className='emi-first'>EMI Per Month :-</p>
                    <input className='emi-input' readOnly value={showResult?`₹ ${emi}`:null} placeholder='Total Monthly EMI...' />
                </div>
            </div>

            <div className='button-holder'>
                <button class="Btn" onClick={()=>{handleSubmit()}} >
                    Calculate EMI
                </button>
            </div>
        </div>
    )
}