import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const ShowList = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    fetch('https://api.tvmaze.com/search/shows?q=all')
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.filter((item) => item.show.image?.medium);
        setShows(filteredData);
      });
  }, []);

  const showList = shows.map((item) => {
    const show = item.show;
    return (
      <li key={show.id} style={{ display: 'inline-block', width: '33.33%' }}>
        <Link to={`/show/${show.id}`}>
          <img src={show.image ? show.image.medium : ''} alt={show.name} />
          <div>{show.name}</div>
        </Link>
        <br />
      </li>
    );
  });

  return (
    <div>
      <h1>Shows List</h1>
      <ul>{showList}</ul>
    </div>
  );
};

const ShowSummary = () => {
    const { id } = useParams();
    const [summary, setSummary] = useState({});
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [ticketDetails, setTicketDetails] = useState({
      movieName: '',
      Language:'',
      date: '',
      time: '',
      seat: '',
    });
  
    useEffect(() => {
      fetch(`https://api.tvmaze.com/shows/${id}`)
        .then((response) => response.json())
        .then((data) => setSummary(data));
    }, [id]);
  
    const handleSubmit = (event) => {
      event.preventDefault();
      localStorage.setItem('ticketDetails', JSON.stringify(ticketDetails));
      setModalIsOpen(false);
      window.alert('Ticket has been booked!');
    };
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setTicketDetails({ ...ticketDetails, [name]: value });
    };
  
    return (
      <div>
        <h1>Summary </h1>
        <div style={{ fontSize: '20px' }} dangerouslySetInnerHTML={{ __html: summary.summary }} />
        <div style={{ display: 'flex', alignItems: 'center' }}>
  <img style={{ marginRight: '20px' }} src={summary.image ? summary.image.medium : ''} alt={summary.name} />
  <div>
    <b style={{ fontSize: '20px' }}>Language - </b>
    <div style={{ fontSize: '20px' }}> {summary.language}</div><br/>
    <b style={{ fontSize: '20px' }}>Runtime - </b>
    <div style={{ fontSize: '20px' }}> {summary.runtime}</div><br/>
    <b style={{ fontSize: '20px' }}>Average Runtime - </b>
    <div style={{ fontSize: '20px' }}> {summary.averageRuntime}</div><br/>
    <b style={{ fontSize: '20px' }}>Premiered - </b>
    <div style={{ fontSize: '20px' }}> {summary.premiered}</div><br/>
    <button onClick={() => setModalIsOpen(true)} style={{ fontSize: '24px', backgroundColor: 'green', color: 'white', padding: '10px 150px', borderRadius: '5px' }}>Book Ticket</button>
  </div>

  {modalIsOpen && (
    <div className="card">
      <form onSubmit={handleSubmit}>
        <div style={{ marginLeft: '50px' }}>
          <h1>Please enter the details</h1><br/>
          <label htmlFor="movieName" style={{ fontSize: '20px' }}>Movie Name:</label>
          <input type="text" id="movieName" name="movieName" style={{ fontSize: '20px' }} value={summary.name} disabled /><br/><br/>

          <label htmlFor="Language" style={{ fontSize: '20px' }}>Language:</label>
          <input type="text" id="language" name="language" style={{ fontSize: '20px' }} value={summary.language} disabled /><br/><br/>

          <label htmlFor="date" style={{ fontSize: '20px' }}>Date:</label>
          <input type="date" id="date" name="date" value={ticketDetails.date} onChange={handleChange} style={{ fontSize: '20px' }} /><br/><br/>

          <label htmlFor="time" style={{ fontSize: '20px' }}>Time:</label>
          <input type="time" id="time" name="time" value={ticketDetails.time} onChange={handleChange} style={{ fontSize: '20px' }} /><br/><br/>

          <label htmlFor="seat" style={{ fontSize: '20px' }}>Seat:</label>
          <input type="text" id="seat" name="seat" value={ticketDetails.seat} onChange={handleChange} style={{ fontSize: '20px' }} /><br/><br/>

          <button type="submit" style={{ fontSize: '24px', backgroundColor: 'green', color: 'white', padding: '10px 150px', borderRadius: '5px' }}>Submit</button>
        </div>
      </form>
    </div>
  )}
</div>
        
        <style jsx>{`
          .card {
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
            padding: 20px;
            margin-top: 20px;
          }
        `}</style>
      </div>
    );
  };
  


export default ShowList;
export { ShowSummary };
