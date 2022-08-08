import './App.css'
import React, { useEffect, useState } from 'react'
import TransitEnterexitRoundedIcon from '@mui/icons-material/TransitEnterexitRounded'
import CakeRoundedIcon from '@mui/icons-material/CakeRounded'
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import ShoppingBasketRoundedIcon from '@mui/icons-material/ShoppingBasketRounded'
import CommuteRoundedIcon from '@mui/icons-material/CommuteRounded'
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded'
import BackspaceRoundedIcon from '@mui/icons-material/BackspaceRounded'
import LoyaltySharpIcon from '@mui/icons-material/LoyaltySharp'
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded'
import DeleteIcon from '@mui/icons-material/Delete'

function App() {
  const [show, setShow] = useState(true)
  const [result, setResult] = useState('')
  const [showbatch, setShowbatch] = useState(true)
  const [income, setIncome] = useState('income')
  const [option, setOption] = useState('Salary')
  const [add, setAdd] = useState([])
  const [incomeMoney, setIncomeMoney] = useState(0)
  const [expenseMoney, setExpenseMoney] = useState(0)

  let total_income = 0
  let total_expense = 0

  const handleclick = (e) => {
    setResult(result.concat(e.target.name))
  }

  const Addmoney = () => {
    if (result !== '') {
      const data = {
        option: option,
        income: income,
        result: parseInt(result),
      }
      data.id = add.length + 1
      setAdd([...add, data])
      setResult('')
      setShowbatch(false)
    }
  }

  useEffect(() => {
    add.forEach((item) => {
      if (item.income === 'income') {
        total_income += item.result
      } else {
        total_expense += item.result
      }
    })
    setIncomeMoney(total_income)
    setExpenseMoney(total_expense)
  }, [add])

  useEffect(() => {
    if (income === 'income') {
      setShow(true)
      setOption('Salary')
    } else {
      setShow(false)
      setOption('Rent')
    }
  }, [income])

  const DeleteItem = (id) => {
    setAdd(add.filter((item) => item.id !== id))
  }
  useEffect(() => {
    if (add.length === 0) {
      setShowbatch(true)
      setIncomeMoney(0)
      setExpenseMoney(0)
    }
  }, [add])

  const OptionIcon = (option) => {
    switch (option) {
      case 'Salary':
        return (
          <AttachMoneyRoundedIcon
            className="material-icons"
            style={{ color: '#ffcd44', backgroundColor: '#fff5e4' }}
          />
        )

      case 'Gift':
        return (
          <CakeRoundedIcon
            className="material-icons"
            style={{ color: '#ff6fb7', backgroundColor: '#ffeafd' }}
          />
        )

      case 'Refund':
        return (
          <ReplayRoundedIcon
            className="material-icons"
            style={{ color: '#a9e61c', backgroundColor: '#f9ffd9' }}
          />
        )

      case 'Rent':
        return (
          <HomeRoundedIcon
            className="material-icons"
            style={{ color: '#ffcd44', backgroundColor: '#fff5e4' }}
          />
        )

      case 'Shopping':
        return (
          <ShoppingBasketRoundedIcon
            className="material-icons"
            style={{ color: '#ff6fb7', backgroundColor: '#ffeafd' }}
          />
        )

      case 'Transport':
        return (
          <CommuteRoundedIcon
            className="material-icons"
            style={{ color: '#00c9ec', backgroundColor: '#e0f3ff' }}
          />
        )

      default:
        return null
    }
  }

  const resultShow = (income, result) => {
    switch (income) {
      case 'income':
        return <p style={{ color: '#a9e61c' }}>+ {result}</p>

      case 'expense':
        return <p style={{ color: '#ff6fb7' }}>- {result}</p>

      default:
        break
    }
  }

  return (
    <>
      <div id="app">
        <div className="container">
          <div className="balance">
            <div className="balance__total">
              <h1>Balance</h1>
              <p>
                <span className="pound">$</span>&nbsp;
                {incomeMoney || expenseMoney
                  ? 0 + incomeMoney - expenseMoney
                  : 0}
              </p>
            </div>

            <div className="balance__type balance__income">
              <div className="balance__group">
                <h2>Income</h2>
                <p>$ {incomeMoney}</p>
              </div>
              <TransitEnterexitRoundedIcon className="material-icons" />
            </div>
            <div className="balance__type balance__expense">
              <div className="balance__group">
                <h2>Expenses</h2>
                <p>$ {expenseMoney}</p>
              </div>
              <TransitEnterexitRoundedIcon className="material-icons" />
            </div>
          </div>

          <div className="balance__details">
            <h3>Recent Transactions</h3>
            {showbatch && (
              <div className="balance__empty">
                <LoyaltySharpIcon className="material-icons" />
                <p>
                  Start adding <br />a new transaction
                </p>
              </div>
            )}
            {!showbatch &&
              add.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <ul>
                      <li className="transaction">
                        <div className="transaction__type icon-1">
                          {OptionIcon(item.option)}
                          <p>{item.option}</p>
                        </div>
                        <div className="transaction__price">
                          {resultShow(item.income, item.result)}
                          <button className="transaction__bin">
                            <DeleteIcon
                              className="material-icons"
                              onClick={() => DeleteItem(item.id)}
                            />
                          </button>
                        </div>
                      </li>
                    </ul>
                  </React.Fragment>
                )
              })}
          </div>
        </div>

        <div className="container">
          <div className="type">
            <div className="type__tab">
              <input
                type="radio"
                name="redio"
                id="tab-1"
                value="income"
                checked={income === 'income'}
                onChange={(e) => setIncome(e.target.value)}
              />
              <label htmlFor="tab-1">Income</label>
              <input
                type="radio"
                name="redio"
                id="tab-2"
                value="expense"
                checked={income === 'expense'}
                onChange={(e) => setIncome(e.target.value)}
              />
              <label htmlFor="tab-2">Expense</label>
              <div className="type__color"></div>
            </div>

            <div className="type__categories">
              {show && (
                <div className="type__categories--inc">
                  <input
                    type="radio"
                    name="radio"
                    id="tab-3"
                    value="Salary"
                    checked={option === 'Salary'}
                    onChange={(e) => setOption(e.target.value)}
                  />
                  <label htmlFor="tab-3" className="icon-1">
                    <AttachMoneyRoundedIcon
                      className="material-icons"
                      id="salary"
                      style={
                        option === 'Salary'
                          ? { color: '#ffcd44', backgroundColor: '#fff5e4' }
                          : { color: '#5b657a' }
                      }
                    />
                    <p>Salary</p>
                  </label>
                  <input
                    type="radio"
                    name="radio"
                    id="tab-4"
                    value="Gift"
                    onChange={(e) => setOption(e.target.value)}
                  />
                  <label htmlFor="tab-4" className="icon-2">
                    <CakeRoundedIcon
                      className="material-icons"
                      style={
                        option === 'Gift'
                          ? { color: '#ff6fb7', backgroundColor: '#ffeafd' }
                          : { color: '#5b657a' }
                      }
                    />
                    <p>Gift</p>
                  </label>
                  <input
                    type="radio"
                    name="radio"
                    id="tab-5"
                    value="Refund"
                    onChange={(e) => setOption(e.target.value)}
                  />
                  <label htmlFor="tab-5" className="icon-3">
                    <ReplayRoundedIcon
                      className="material-icons"
                      style={
                        option === 'Refund'
                          ? { color: '#a9e61c', backgroundColor: '#f9ffd9' }
                          : { color: '#5b657a' }
                      }
                    />
                    <p>Refund</p>
                  </label>
                </div>
              )}

              {!show && (
                <div className="type__categories--exp">
                  <input
                    type="radio"
                    name="radio"
                    id="tab-7"
                    value="Rent"
                    checked={option === 'Rent'}
                    onChange={(e) => setOption(e.target.value)}
                  />
                  <label htmlFor="tab-7" className="icon-1">
                    <HomeRoundedIcon
                      className="material-icons"
                      style={
                        option === 'Rent'
                          ? { color: '#ffcd44', backgroundColor: '#fff5e4' }
                          : { color: '#5b657a' }
                      }
                    />
                    <p>Rent</p>
                  </label>
                  <input
                    type="radio"
                    name="radio"
                    id="tab-8"
                    value="Shopping"
                    onChange={(e) => setOption(e.target.value)}
                  />
                  <label htmlFor="tab-8" className="icon-2">
                    <ShoppingBasketRoundedIcon
                      className="material-icons"
                      style={
                        option === 'Shopping'
                          ? { color: '#ff6fb7', backgroundColor: '#ffeafd' }
                          : { color: '#5b657a' }
                      }
                    />
                    <p>Shopping</p>
                  </label>
                  <input
                    type="radio"
                    name="radio"
                    id="tab-9"
                    value="Transport"
                    onChange={(e) => setOption(e.target.value)}
                  />
                  <label htmlFor="tab-9" className="icon-4">
                    <CommuteRoundedIcon
                      className="material-icons"
                      style={
                        option === 'Transport'
                          ? { color: '#00c9ec', backgroundColor: '#e0f3ff' }
                          : { color: '#5b657a' }
                      }
                    />
                    <p>Transport</p>
                  </label>
                </div>
              )}
            </div>

            <div className="type__amount">
              <input
                type="text"
                maxLength={5}
                placeholder="$0.00"
                id="display"
                value={result}
                readOnly
              />
              <button className="type__add" onClick={Addmoney}>
                <AddCircleRoundedIcon className="material-icons" />
              </button>
            </div>
          </div>
          <div className="calculator">
            <button
              className="calculator__number"
              name="1"
              onClick={handleclick}
            >
              1
            </button>
            <button
              className="calculator__number"
              name="2"
              onClick={handleclick}
            >
              2
            </button>
            <button
              className="calculator__number"
              name="3"
              onClick={handleclick}
            >
              3
            </button>
            <button
              className="calculator__number"
              name="4"
              onClick={handleclick}
            >
              4
            </button>
            <button
              className="calculator__number"
              name="5"
              onClick={handleclick}
            >
              5
            </button>
            <button
              className="calculator__number"
              name="6"
              onClick={handleclick}
            >
              6
            </button>
            <button
              className="calculator__number"
              name="7"
              onClick={handleclick}
            >
              7
            </button>
            <button
              className="calculator__number"
              name="8"
              onClick={handleclick}
            >
              8
            </button>
            <button
              className="calculator__number"
              name="9"
              onClick={handleclick}
            >
              9
            </button>
            <button
              className="calculator__number"
              name="."
              onClick={handleclick}
            >
              .
            </button>
            <button
              className="calculator__number"
              name="0"
              onClick={handleclick}
            >
              0
            </button>
            <div className="calculator__cancel" onClick={() => setResult('')}>
              <BackspaceRoundedIcon
                className="material-icons"
                style={{ fontSize: '24px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
