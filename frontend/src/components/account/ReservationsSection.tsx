interface Reservation {
  id: number,
  name: string,
  email: string,
  start_date: string,
  end_date: string,
  total_price: number
}

function ReservationsSection({ data }: { data: Reservation[] }){
  return (
    <>
      {
        data.length > 0 ? data.map((res, index) => (
          <>
            <p><span className="font-bold">Reservation ID: </span>{res.id}</p>
            <p><span className="font-bold">Item: </span>{res.name}</p>
            <p><span className="font-bold">Start Date: </span>{new Date(res.start_date).toLocaleDateString()}</p>
            <p><span className="font-bold">End date: </span>{new Date(res.end_date).toLocaleDateString()}</p>
            <p><span className="font-bold">Order Total: </span>${res.total_price}</p>
            <br />
            <div className="border-b border-gray-300" />
            <br />
          </>
        )) : <p>You have no upcoming reservations.</p>
      }
    </>
  )
}

  export default ReservationsSection
