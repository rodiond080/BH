import React from 'react';
import photo from '@public/images/about/CBo-GAE-ioY.jpg';
import {withRouter} from "react-router";

const About = (props)=>{
  return(
    <section className="about__main">
      <div className="about__main-main">
        <div className="border">
          <img src={photo} alt="" />
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur enim iusto maxime placeat rem.
          Aliquid aperiam, atque consequatur consequuntur molestias nesciunt odio quae quibusdam quod reprehenderit?
          Corporis eligendi eos hic illo ipsa ipsam iure laudantium maiores modi molestias nesciunt, obcaecati
          officia placeat, praesentium quia quibusdam sed voluptate voluptatem. Atque ipsam iste magnam maxime quos
          reiciendis sit! Accusantium dignissimos dolor dolore ducimus eos inventore officia, officiis quod soluta
          totam. Amet dignissimos dolore molestiae, neque obcaecati placeat possimus quasi sed? Ab adipisci alias
          cum dolores enim eos facilis id inventore itaque laboriosam magnam, maxime, modi nulla porro quam quisquam
          rem tempore ullam veritatis voluptatibus. Ab at dolores eligendi eos excepturi nisi odit, vitae!
          Architecto aut autem deleniti deserunt dignissimos doloribus, ducimus eaque est et ex exercitationem,
          harum, iure labore laborum laudantium mollitia odit perspiciatis quia recusandae repellendus repudiandae
          tenetur ullam! Consequatur distinctio eos error fuga minus officiis omnis quasi unde. Distinctio,
          suscipit!
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ad aliquid consequatur dolore doloremque
          dolorum eaque, eligendi enim error facere fugit inventore libero molestiae natus neque nesciunt optio
          praesentium ratione sequi similique tempore ut veniam voluptates! At atque doloremque dolorum illo illum
          quibusdam quo ratione rem? Adipisci animi culpa dolorum eaque et fuga harum labore laudantium minus
          molestias natus non, odio, pariatur, placeat quasi quibusdam rem sunt temporibus vel vitae? Adipisci
          consequuntur ea, inventore laudantium non omnis quos reiciendis sit vero! Accusamus adipisci aliquid
          consectetur distinctio dolores dolorum enim error, et excepturi illum ipsam ipsum iusto magni molestiae
          natus nobis odit pariatur perspiciatis praesentium provident quia quo quod recusandae repellendus sit.
          Corporis facilis fuga fugit illo illum magnam maxime, necessitatibus nostrum odit, pariatur quo ratione
          repudiandae sed sit velit voluptate voluptates? Accusamus ad dolore ducimus eligendi ipsam iure minus
          mollitia numquam odio odit praesentium quaerat ratione, saepe sint sunt suscipit?
        </div>

      </div>


    </section>
  )
}

export default withRouter(About);
