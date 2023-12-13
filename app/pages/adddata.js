import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDocClient } from "@/config/ddbDocClient";
import { UserAuth } from "../context/AuthContext";
import TokenApi from "../api/TokenApi";

const AddData = ({passIntoFunct, upcomingDonation, latestDonation}) => {
  
  const { user } = UserAuth();
  const handleSubmit = async (event) => {

    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    const params = {
      uid: user.uid,
      upcomingDonation: upcomingDonation,
      latestDonation: latestDonation,
    }

    try {
      const data = await TokenApi.addUpcomingDonation(params);
      console.log("Success - date added", data);
      passIntoFunct();
    } catch (err) {
      console.log("Error", err.stack);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" className="border p-2 min-w-[7%] border-red-600 border-2 rounded-full hover:border-black hover:bg-slate-200 hover:bg-red-600 transition ease-in-out">Confirm</button>
    </form>
  );
};

export default AddData;
