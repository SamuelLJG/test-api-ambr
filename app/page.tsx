import Image from "next/image"
import {characters} from "./data/characters"
import Link from "next/link";



export default function Home() {
    function formatarNome(nome:string) {
        return nome
          .split('-')
          .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1))
          .join('_');
      }
      function formatarNomeComEspaco(nome: string) {
        return nome
          .split('_')
          .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1))
          .join(' ');
      }
      function formatCharacterName(name: string) {
       
        if (name === 'Traveler Hydro' ||
            name === 'Traveler Dendro' ||
            name === 'Traveler Anemo' ||
            name === 'Traveler Geo' ||
            name === 'Traveler Electro' ||
            name === 'Traveler Pyro') {
            return 'Viajante';
          }
          if (name === 'Raiden Shogun') {
            return 'Raiden';
          }
          if (name === 'Arataki Itto') {
            return 'Itto';
          }
          if (name === 'Kamisato Ayaka') {
            return 'Ayaka';
          }
          if (name === 'Kamisato Ayato') {
            return 'Ayato';
          }
          if (name === 'Yumemizuki Mizuki') {
            return 'Mizuki';
          }
          if (name === 'Kujou Sara') {
            return 'Sara';
          }
          if (name === 'Shikanoin Heizou') {
            return 'Heizou';
          }
          if (name === 'Sangonomiya Kokomi') {
            return 'Kokomi';
          }
          if (name === 'Kaedehara Kazuha') {
            return 'Kazuha';
          }
          if (name === 'Kuki Shinobu') {
            return 'Kuki';
          }
        return name;
      }
    return (
        <main id="main-index" className="iii"> 
            <div id="main-characters-flex">
            {characters.map((char:any,i:any)=> (
                <Link href={`/${char.name}`} key={i} className={`character-card ${char.elementType} ${char.name.replace(/-/g, '').replace(/traveler/gi, "viajante")} ${char.weapon} rarity-${char.rarity}`}><Image width={100} height={100} src={`https://genshinbuild.com/images/Team-Icons/${formatarNome(char.name)}.png`} alt={formatarNomeComEspaco(formatarNome(char.name))} className={`rarity-${char.rarity} char-img`} loading="eager" priority/>
                  <div className={`rara-${char.elementType}`}></div>
                   <div className="elel">
                    <Image width={100} height={100} src={`https://genshinbuild.com/images/${char.weapon}.webp`} alt="" />
                  </div>
                  <div className="count">
                      <Image width={100} height={100} src={`https://genshinbuild.com/images/tier-${char.rank}.svg`} alt="" />
                  </div>
            
            <p>{formatCharacterName(formatarNomeComEspaco(formatarNome(char.name)))}</p>
            {char.newCharacter != null ? <span>{char.newCharacter}</span> : ''  }
            {char.soonCharacter != null ? <span style={{backgroundColor:'#02c2b2', left:'calc(-30px * var(--minimize))'}}>{char.soonCharacter}</span> : ''  }
            </Link>
            
        ))}</div></main>
    )
}