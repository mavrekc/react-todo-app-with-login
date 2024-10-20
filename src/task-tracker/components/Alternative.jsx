
import './App.css'
import { SiMailchimp, SiDribbble,  } from "react-icons/si";
import { BsReddit } from "react-icons/bs";

function App() {

  const cards = [
    {
      icon: <SiMailchimp className='icon'/>,
      company: 'MailChimp',
      days: '1',
      tag: 'Design',
      title: 'Senior Product Designer-Singapore',
      applied: '32',
      total: '50'
    },
    {
      icon: <SiDribbble className='icon'/>,
      company: 'Dribble',
      days: '4',
      tag: 'Product',
      title: 'Junior Product Designer-Singapore',
      applied: '42',
      total: '70'
    },
    {
      icon: <BsReddit className='icon'/>,
      company: 'Reddit',
      days: '2',
      tag: 'Design',
      title: 'Software Architect Java-USA',
      applied: '52',
      total: '100'
    },
    {
      icon: <SiMailchimp className='icon'/>,
      company: 'MailChimp',
      days: '1',
      tag: 'Design',
      title: 'Senior Product Designer-Singapore',
      applied: '32',
      total: '50'
    },
    {
      icon: <SiDribbble className='icon'/>,
      company: 'Dribble',
      days: '4',
      tag: 'Product',
      title: 'Junior Product Designer-Singapore',
      applied: '42',
      total: '70'
    },
    {
      icon: <BsReddit className='icon'/>,
      company: 'Reddit',
      days: '2',
      tag: 'Design',
      title: 'Software Architect Java-USA',
      applied: '52',
      total: '100'
    },
    // {
    //   icon: <SiMailchimp className='icon'/>,
    //   company: 'MailChimp',
    //   days: '1',
    //   tag: 'Design',
    //   title: 'Senior Product Designer-Singapore',
    //   applied: '32',
    //   total: '50'
    // },
    // {
    //   icon: <SiDribbble className='icon'/>,
    //   company: 'Dribble',
    //   days: '4',
    //   tag: 'Product',
    //   title: 'Junior Product Designer-Singapore',
    //   applied: '42',
    //   total: '70'
    // },
    // {
    //   icon: <BsReddit className='icon'/>,
    //   company: 'Reddit',
    //   days: '2',
    //   tag: 'Design',
    //   title: 'Software Architect Java-USA',
    //   applied: '52',
    //   total: '100'
    // }
  ]

  return (
    <div className='container'>
      <div className='main-container'>
        {cards.map((card, index) => {
          return (
            <div key={index} className='card-container'>
              <div className='header'>
                <div className='header-left'>
                  {card.icon}
                  <div className='header-left-text'>
                    <span className='company-name'>{card.company}</span>
                    <span className='post-date'>{card.days} days ago</span>
                  </div>
                </div>
                <div className='header-right'>
                  <span className='post-tag'>{card.tag}</span>
                </div>
              </div>
              <div className='title'>
                <p className='title-text'>
                  {card.title}
                </p>
              </div>
              <div className='footer'>
                <div className='progress-bar'>
                  <div className='progress-bar-active'>
                  </div>
                </div>
                <div className='stats'>
                  <p>{card.applied} applied <span>of {card.total} capacity</span></p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
