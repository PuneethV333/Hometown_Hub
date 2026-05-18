const ErrorCard = ({ message }: { message: string }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#FFE4E4] text-center">
    <p className="text-sm text-[#E24B4A]">{message}</p>
  </div>
);

export default ErrorCard;