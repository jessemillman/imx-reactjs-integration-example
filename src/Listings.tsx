import testimge from './assets/images/3.jpg';
import avatar from './assets/images/avatar.png';
import './Listings.css'

const Listings = () => {
    return (
        <>
            <div className='inline-div'>
              <div className='top-header'>
                <h4 style={{ 'marginLeft': '21px' }}> Listed Assets</h4>
                <button className='list-btn' type="button">Guild of Guardians</button>
                <button className='list-btn' type="button">Gods Unchained</button>
              </div>

              <div className='card-split'>
                <div className='cards'>
                  <img src={testimge} />
                  <p>Varik</p>
                  <div>
                    <img className='avatar-img' src={avatar} />
                    <span className='text-spn'>@jessemillman.eth</span>
                  </div>


                </div>

                <div className='cards'>
                  <img src={testimge} />
                  <p>Varik</p>
                  <div>
                    <img className='avatar-img' src={avatar} />
                    <span className='text-spn'>@jessemillman.eth</span>
                  </div>


                </div>

                <div className='cards'>
                  <img src={testimge} />
                  <p>Varik</p>
                  <div>
                    <img className='avatar-img' src={avatar} />
                    <span className='text-spn'>@jessemillman.eth</span>
                  </div>


                </div>

                <div className='cards'>
                  <img src={testimge} />
                  <p>Varik</p>
                  <div>
                    <img className='avatar-img' src={avatar} />
                    <span className='text-spn'>@jessemillman.eth</span>
                  </div>


                </div>
              </div>


            </div>
        </>
    )
}

export default Listings