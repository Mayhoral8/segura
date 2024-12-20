import React, {useState} from 'react'
import SameCurrency from './SameCurrency';
import InternationalTransfer from './InternationalTransfer';

const NewTransfer = () => {
  const [transferType, setTransferType] = useState({
    local: true,
    international: false,
  });

  const handleTransferTypeChange = (type) => {
    type === "LOCAL"
      ? setTransferType({ ...transferType, local: true, international: false })
      : type === "INTERNATIONAL"
      ? setTransferType({ ...transferType, local: false, international: true })
      : setTransferType({ ...transferType });
  };
  return (
    <section className="w-[60%] border-l h-full flex flex-col justify-center items-center py-4">
    <span className="text-lg font-bold">Transfer Money</span>
    <div className="flex items-center text-center px-4 w-[90%] mt-4 text-sm">
      <span
        className={`${
          transferType.local ? "shadow-md text-gray-900" : "shawdow-md text-[#8C8C8C]"
        }  w-[50%] border py-1 cursor-pointer`}
        onClick={() => handleTransferTypeChange("LOCAL")}
      >
        Transfer same currency
      </span>
      <span
        className={`${
          transferType.international ? "shadow-md text-gray-900" : "shawdow-md text-[#8C8C8C]"
        }  w-[50%] border py-1 cursor-pointer`}
        onClick={() => handleTransferTypeChange("INTERNATIONAL")}
      >
        International Transfer
      </span>
    </div>
    {transferType.local ? <SameCurrency /> : <InternationalTransfer />}
  </section>
  )
}

export default NewTransfer