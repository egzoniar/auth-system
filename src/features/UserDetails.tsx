import { BsArrowLeftShort } from "react-icons/bs";
import { MNavLink } from "../components/Buttons";
import { me } from "../api/user.services";
import { useQuery } from "react-query";
import PulseLoader from "../components/PulseLoader";

const UserDetails = () => {
  const {data: userDetails, isLoading } = useQuery("userDetails", me);

  const renderProperties = () => {
    const {id, firstName, lastName, email} = userDetails!;

    const toString = JSON.stringify({id, firstName, lastName, email}).replace("{", "").replace("}", "");
    const properties = toString.split(",");

    const result = properties.map((property, index) => {
      const [key, value] = property.split(":");
      const formatedKey = key.replaceAll('"', "");

      return (
        <div key={index} className="flex flex-row gap-2">
          <p>
            <strong>{formatedKey}</strong>: <span className="text-orange-500">{value}</span>,
          </p>
        </div>
      );
    })

    return (
      <pre className="ml-5">
        {result}
      </pre>
    )
  }

  return (
    <div className="flex flex-col gap-6 items-center">
      <h1 className="text-4xl">User Details</h1>

      {
        isLoading ? <PulseLoader />
        : (
          <div className="flex flex-col items-start shadow-inner text-base min-w-[40vw] bg-gray-200 text-gray-600 rounded-[5px] p-3">
            <pre>{"{"}</pre>
            { userDetails && renderProperties()}
            <pre>{"}"}</pre>
          </div>
        )        
      }

      <MNavLink to="/" title="Home" icon={<BsArrowLeftShort size={20} />} />
    </div>
  );
};

export default UserDetails;