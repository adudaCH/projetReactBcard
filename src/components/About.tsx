import { FunctionComponent, useContext } from "react";
import { ThemeContext } from "../services/darkLightTheme";
import { Link } from "react-router-dom";


interface AboutProps {}

const About: FunctionComponent<AboutProps> = () => {
    const theme = useContext(ThemeContext);

    return (
        <main style={{ backgroundColor: theme.background, color: theme.color, minHeight:"100vh"  }}>
            <div className="fluid-container w-75 p-5">
                <h1 className="about">About Us</h1>
                    <p className="lh-base about">
                    Welcome to the future of networking! Our Business Card Web
                    App is designed to revolutionize the way you connect with
                    others, both personally and professionally. Gone are the
                    days of carrying stacks of physical cards that can be
                    misplaced or discarded. With our platform, you can create
                    sleek, customizable digital business cards that are always
                    accessible, eco-friendly, and easy to share. Our mission is
                    to empower individuals and businesses to make meaningful
                    connections in the digital age. Whether you're an
                    entrepreneur, freelancer, corporate professional, or small
                    business owner, our app provides you with the tools to stand
                    out. You can showcase your contact information, portfolio,
                    social media links, and even integrate QR codes, all in a
                    beautifully crafted card that's just a click away.
                    </p>

                <ul className="about">
                    <li>
                        <strong>Customizable Designs:</strong> Personalize your
                        digital card to reflect your brand's identity. Choose
                        colors, layouts, and templates that make your card
                        unique.
                    </li>
                    <li>
                        <strong>Interactive Features:</strong> Share your card
                        instantly via email, text, or QR code. Include clickable
                        links to websites, social profiles, and more.
                    </li>
                    <li>
                        <strong>Eco-Friendly Networking:</strong> Say goodbye to
                        paper waste and embrace a sustainable approach to
                        sharing your information.
                    </li>
                    <li>
                        <strong>Easy Management:</strong> Update your details
                        anytime and ensure your contacts always have the latest
                        information.
                    </li>
                </ul>

                <p className="lh-base about">
                    Our vision is to simplify the process of networking and
                    ensure you leave a lasting impression. Whether you're
                    meeting someone in person or virtually, our platform bridges
                    the gap and makes connecting seamless. Ready to elevate your
                    networking game? Join our community today and redefine how
                    you share your story with the world.
                </p>
            </div>
            <footer className='text-center mt-5 py-3 border-top w-100 '>
					<h2 className='mt-5'>Contact Us</h2>
					<p>
						Have questions or want to learn more? Feel free to reach out to us
						at
					</p>
					<Link to='mailto:support@b_cards.com' >
						support@b_cards.com
					</Link>
					<p className="mt-2">&copy; {new Date().getFullYear()} bCards. All Rights Reserved.</p>
				</footer>
        </main>
    );
};



export default About;
