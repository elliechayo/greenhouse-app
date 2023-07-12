import styled from "@emotion/styled";

// assets
import BlogHeroImage from "../assets/blog-hero.jpg";
import blogPostImage from "../assets/blogpostmain.jpeg";

// components
import BlogPost from "../components/Blog/BlogPost";

export default function Blog() {
  const blogPost = {
    id: 1,
    title: "Choosing the Perfect Indoor Plants for Your Home",
    image: blogPostImage,
    author: "Erik Smith",
    date: "Feb 28th, 2023",
    tags: "Indoor Plants",
    content: `Bringing the beauty of nature indoors is a delightful way to 
    enhance your living space while reaping the numerous benefits that plants 
    offer. However, with the vast array of indoor plants available, it can be 
    overwhelming to choose the perfect ones for your home. In this blog post, 
    we will guide you through the process of selecting the ideal indoor plants 
    that will thrive in your specific environment, catering to your lifestyle 
    and design preferences. 

`,

  };
  return (
    <main>
      <BlogHeroWrapper>
        <h1>Our Blog</h1>
      </BlogHeroWrapper>
      <PostWrapper>
        <div className="tags">
          <h3>Popular Tags</h3>
          <ul>
            <li>
              <button>Plants</button>
            </li>
            <li>
              <button>Pots</button>
            </li>
            <li>
              <button>Bonsai</button>
            </li>
            <li>
              <button>Big Sale</button>
            </li>
            <li>
              <button>Sell</button>
            </li>
            <li>
              <button>Moss</button>
            </li>
          </ul>
        </div>
        <BlogPost post={blogPost} />
      </PostWrapper>
    </main>
  );
}

const BlogHeroWrapper = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  background: url(${BlogHeroImage});
  background-size: cover;
  min-height: 400px;
  background-position: center;
  display: flex;
  align-items: center;
  padding-left: 60px;

  h1 {
    font-size: clamp(38px, 5vw, 64px);
  }

  @media (max-width: 768px) {
    padding-left: 30px;
  }
`;

const PostWrapper = styled.section`
  max-width: 1200px;
  margin: 40px auto 0;

  display: flex;
  justify-content: center;
  gap: 20px;

  .tags {
    max-width: 600px;
    margin: 20px auto;
    h3 {
      font-weight: bold;
      font-size: 17px;
      text-align: center;
      text-transform: uppercase;

      ::after {
        content: "";
        display: block;
        width; 100%;
        height: 2px;
        background: var(--light-bg);
        margin-top: 20px;
      }
    }

    ul {
      display: flex;
      margin: 30px 0;
      justify-content: center;
      align-items: center;
      gap: 20px;
      flex-wrap: wrap;

      li {
        padding: 7px 10px;
        text-align: center;
        border-radius: 2px;
        background: var(--light-bg);
        color: gray;
      }
    }
  }

  @media (max-width: 968px) {
    flex-direction: column;
  }
`;
