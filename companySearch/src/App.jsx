import { useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import {ToastContainer, toast} from 'react-toastify';

function App() {
  const [count, setCount] = useState(0);
  const [empresa, setEmpresa] = useState();
  const [cnpj, setCNPJ] = useState();
  const [lock_date, setLockDate] = useState();
  const [phone, setPhone] = useState();



  async function companySearch() {
    let api = 'https://api.gtech.site/companies/:cnpj/is_blocked'
    api = api.replace(':cnpj', cnpj);



      await axios.get(api).then(e => {
        if (e.data != null) {
          console.log(`''${JSON.stringify(e.data)}''`, 'asdasdasdad')
          if(!JSON.stringify(e.data).includes('""')){
            setEmpresa(e.data)

          }else{
            console.log('Cannot to Search the Company');
            toast.error('ERROR')
        
          }
        }

      }).catch(e => {
        console.log(e);
      })
      
    }


  



  function KeyDownEnter(e) {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      companyVerify()
    }

  }


  //11586637000128

  return (

    <div className='body'>
      <ToastContainer 
theme="dark"/>

      <div className='flex flex-col bg-indigo-900 w-full h-screen items-center'>

        <div className="mx-auto max-w-screen-xl px-5 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl text-gray-200 font-bold sm:text-3xl">Company Search!</h1>

            <p className="mt-4 text-gray-300">
              Type a CNPJ and click on button Search to show details
            </p>
          </div>

          <div className="mx-auto mt-8 mb-0 max-w-md space-y-4">
            <div>

              <div className="relative">
                <input
                  placeholder='Enter the CNPJ'
                  value={cnpj} onChange={e => setCNPJ(e.target.value)} onKeyDown={KeyDownEnter}
                  type="number"
                  className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                />
              </div>
            </div>

            <div className='flex flex-row justify-end' onClick={companySearch}>

              <button className=" flex items-center justify-between">
                <p></p>
                <a
                  className="group relative inline-block overflow-hidden border border-indigo-600 px-8 py-3 focus:outline-none focus:ring"
                >
                  <span
                    className="absolute inset-y-0 left-0 w-[2px] bg-indigo-600 transition-all group-hover:w-full group-active:bg-indigo-500">
                  </span>

                  <span
                    className="relative text-sm font-medium text-indigo-600 transition-colors group-hover:text-white" >
                    Search
                  </span>
                </a>
              </button>
            </div>

          </div>
        </div>

        {
          empresa &&
          <div className="animate-pulse col-span-2 sm:col-span-1">
            <p className="font-medium text-gray-200 font-bold sm:text-3xl">Company Info.</p>

            <nav aria-label="Footer Navigation - Services" className="mt-6">
              <ul className="space-y-4 text-sm">
                <li>
                  <a href="#" className="text-gray-300 transition hover:opacity-75">
                    Company name:  {empresa.name}
                  </a>
                </li>

                <li>
                  <a href="#" className="text-gray-300 transition hover:opacity-75">
                    CNPJ:  {empresa.cnpj}
                  </a>
                </li>

                {
                  moment(empresa.lock_date).diff(moment(), 'days').toFixed(0) > 0
                    ?
                    < li >
                      <a href="#" className="text-gray-300 transition hover:opacity-75">
                        Lock date  {moment(empresa.lock_date).format('DD/MM/YYYY')}
                        <span className='pl-5 text-green-200'>
                          {
                            `${moment(empresa.lock_date).diff(moment(), 'days').toFixed(0)} Days To Lock`
                          }
                        </span>
                      </a>
                    </li>
                    :
                    < li >
                      <a href="#" className="text-gray-300 transition hover:opacity-75">
                        Lock Date:  {moment(empresa.lock_date).format('DD/MM/YYYY')}
                        <span className='pl-5 text-red-200'>
                          {
                            `${moment().diff(moment(empresa.lock_date), 'days').toFixed(0)} Days Locked`
                          }
                        </span>
                      </a>
                    </li>
                }

                <li>
                  <a href="#" className="text-gray-300 transition hover:opacity-75">
                    Phone:  {empresa.phone}
                  </a>
                </li>

              </ul>
            </nav>
          </div>
        }


      </div >

    </div>
  )

}

export default App
