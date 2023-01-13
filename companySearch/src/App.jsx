import { useState } from 'react'
import axios from 'axios'
import moment from 'moment'

function App() {
  const [count, setCount] = useState(0)

  const [empresa, setEmpresa] = useState();
  const [cnpj, setCNPJ] = useState();
  const [lock_date, setLockDate] = useState();
  const [phone, setPhone] = useState();


  async function searchCompany() {
    let api = 'https://api.gtech.site/companies/:cnpj/is_blocked'
    api = api.replace(':cnpj', cnpj);



    await axios.get(api).then(e => {
      console.log(e);
      setEmpresa(e.data)
    })

  }

  function KeyDownEnter(e) {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      searchCompany()
    }

  }


  //11586637000128
  return (

    <div className='flex flex-col bg-indigo-900 w-full h-screen items-center'>

      <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-lg text-center">
          <h1 class="text-2xl text-gray-200 font-bold sm:text-3xl">Search Company!</h1>

          <p class="mt-4 text-gray-300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero nulla
            eaque error neque ipsa culpa autem, at itaque nostrum!
          </p>
        </div>

        <div action="" class="mx-auto mt-8 mb-0 max-w-md space-y-4">
          <div>
            <label for="email" class="sr-only">Email</label>

            <div class="relative">
              <input
                placeholder='Enter the CNPJ'
                value={cnpj} onChange={e => setCNPJ(e.target.value)} onKeyDown={KeyDownEnter}
                type="number"
                class="w-full rounded-lg border-gray-200 p-4   text-sm shadow-sm"
              />
            </div>
          </div>


          <div class="flex items-center justify-between">
            <p class="text-sm text-gray-500">
              {/* No account? */}
              {/* <a class="underline" href="">Sign up</a> */}
            </p>

            <button
              onClick={searchCompany}
              class="ml-3 inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {
        empresa &&
        <div class="animate-pulse col-span-2 sm:col-span-1">
          <p class="font-medium text-gray-200 font-bold sm:text-3xl">Company Info.</p>

          <nav aria-label="Footer Navigation - Services" class="mt-6">
            <ul class="space-y-4 text-sm">
              <li>
                <a href="#" class="text-gray-300 transition hover:opacity-75">
                  Razao social:  {empresa.name}
                </a>
              </li>

              <li>
                <a href="#" class="text-gray-300 transition hover:opacity-75">
                  CNPJ:  {empresa.cnpj}
                </a>
              </li>

              {
                moment(empresa.lock_date).diff(moment(), 'days').toFixed(0) > 0
                  ?
                  < li >
                    <a href="#" class="text-gray-300 transition hover:opacity-75">
                      Data de bloqueio:  {moment(empresa.lock_date).format('DD/MM/YYYY')}
                      <span className='pl-5 text-green-200'>
                        {
                          `${moment(empresa.lock_date).diff(moment(), 'days').toFixed(0)} Days To Lock`
                        }
                      </span>
                    </a>
                  </li>
                  :
                  < li >
                    <a href="#" class="text-gray-300 transition hover:opacity-75">
                      Data de bloqueio:  {moment(empresa.lock_date).format('DD/MM/YYYY')}
                      <span className='pl-5 text-red-200'>
                        {
                          `${moment().diff(moment(empresa.lock_date), 'days').toFixed(0)} Days Locked`
                        }
                      </span>
                    </a>
                  </li>
              }

              <li>
                <a href="#" class="text-gray-300 transition hover:opacity-75">
                  Telefone:  {empresa.phone}
                </a>
              </li>

            </ul>
          </nav>
        </div>
      }


    </div >
  )
}

export default App
