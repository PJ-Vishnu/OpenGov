import Card from "./Card"

function Home (){

    let name = 'asa'
    return(
      <>
      
      
      <h1>Home {10+20} {name}</h1>
      <Card price={1000} name={'title'} />
      <Card price={1000} name={'title'} />
      <Card price={1000} name={'title'} />
      <Card price={1000} name={'title'} />
      <Card price={1000} name={'title'} />
      <Card price={10000} name={'tdsditle'} />
     
      
      
      </>
    )
}

export default Home