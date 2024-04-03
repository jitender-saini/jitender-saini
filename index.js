/**
 * README Generator
 */
const md = require('markdown-it')({
    html: true,
    linkify: true,
    breaks: true
});
const mdEmoji = require('markdown-it-emoji');
const fs = require('fs');
const axios = require('axios').default;

md.use(mdEmoji);

const BLOG_HOST = `https://jitender-saini.medium.com`;

/* README Sections */
const introTitle = generateTitle(2, `Hey :wave:, I'm ${generateLink('Jay', 'https://jitender-saini.github.io/')}`);
const introDescription = `I'm currently a data engineer at **${generateLink('air up GmbH', 'https://www.air-up.com/')}** and formerly at **${generateLink(
    'TO THE NEW',
    'https://tothenew.com/'
)}** based in 🌁 Munich.`;


const badgeConfigs = [
{
        name: 'LinkedIn',
        badgeText: '@saini--jitender',
        labelBgColor: '0077B5',
        logoBgColor: '0077B5',
        logo: 'LinkedIn',
        link: 'https://www.linkedin.com/in/saini-jitender/',
    },{
        name: 'Website',
        badgeText: 'jitender--saini.github.io',
        labelBgColor: '4E69C8',
        logoBgColor: '4E69C8',
        logo: 'Firefox',
        link: 'https://jitender-saini.github.io',
    },
    {
        name: 'Medium',
        badgeText: '@jitender--saini',
        labelBgColor: '034a6c',
        logoBgColor: '034a6c',
        logo: 'Medium',
        link: 'https://jitender-saini.medium.com',
    },
    {
        name: 'DevTo',
        badgeText: '@jitender--saini',
        labelBgColor: '0A0A0A',
        logoBgColor: '0A0A0A',
        logo: 'dev.to',
        link: 'https://dev.to/jitender-saini',
    },
    {
        name: 'Spotify',
        badgeText: '@JaySaini',
        labelBgColor: '1ED760',
        logoBgColor: 'fff',
        logo: 'Spotify',
        link: 'https://open.spotify.com/user/w2g7q0sr8eibbb16aikslpfmc?si=c3d493cf3c1a4570',
    },
    {
        name: 'Instagram',
        badgeText: '@fotos.jay',
        labelBgColor: '7236bb',
        logoBgColor: '7236bb',
        logo: 'Instagram',
        link: 'https://instagram.com/fotos.jay',
    }
];
const badges = badgeConfigs.reduce((result, config) => result + ' ' + generateBadge(config), '');

const gif = `<img align="right" src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2R5YjV2eGdsZmNqaWc3dGh1MWNqazNreGdueHdvNmFzbWNzYWF0YiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/iIqmM5tTjmpOB9mpbn/giphy.gif" />`;
const factsTitle = generateTitle(2, `:zap: A Few Quick Facts`);
const factsConfigs = [
    `🔭 I’m currently working on PySpark, AWS Glue, Airflow, Redshift`,
    `🧐 Learning about **serverless architectures**, **Big Data**, and a bit of **Terraform**.`,
    `👨‍💻 Most of my projects are available on [Github](https://github.com/jitender-saini).`,
//    `📝 I <del>regulary</del> write articles on [my blog](${BLOG_HOST}).`,
    `💬 Ping me about **big data, security, and cloud stuff**.`,
    `📙 Check out my [resume](https://drive.google.com/file/d/1vkJDcibnFZLAPMTU33lMMf2QoGAdxPSR/view?usp=sharing).`,
    `🎉 Fun Fact: Cooking is my stress buster!`,
];
const facts = factsConfigs.reduce((result, fact) => result + `\n - ${fact}`, '');

const toolsTitle = generateTitle(2, `:rocket: Some Tools I Use`)
const toolsIconSize = 40;
const toolsConfig = [{
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original-wordmark.svg',
        alt: 'python',
    },
    {
        src: 'https://www.vectorlogo.zone/logos/amazon_aws/amazon_aws-icon.svg',
        alt: 'AWS Glue',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/apache/apache-original-wordmark.svg',
        alt: 'PySpark',
    },
    {
        src: 'https://cwiki.apache.org/confluence/download/attachments/145723561/wordmark_1.svg?api=v2',
        alt: 'Airflow',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/pycharm/pycharm-original-wordmark.svg',
        alt: 'PyCharm',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg',
        alt: 'Docker',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original-wordmark.svg',
        alt: 'Java',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg',
        alt: 'React',
    },
    {
        src: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Amazon-Redshift-Logo.svg',
        alt: 'Redshift',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg',
        alt: 'MySQL',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/spring/spring-original-wordmark.svg',
        alt: 'Spring Boot',
    },
    {
        src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Heroku_logo.svg/220px-Heroku_logo.svg.png',
        alt: 'Heroku',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
        alt: 'AWS',
    },
    {
        src: 'https://www.vectorlogo.zone/logos/terraformio/terraformio-icon.svg',
        alt: 'Terraform',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg',
        alt: 'Javascript',
    }
];;

const tools = toolsConfig.reduce((result, toolConfig) => result + '\n' + generateIcon(toolConfig, toolsIconSize), '');

const stats = `<img src="https://github-readme-stats.vercel.app/api?username=jitender-saini&show_icons=true&count_private=true" alt="jitender-saini" />`;

const visitors = `[![HitCount](https://hits.dwyl.com/jitender-saini/jitender-saini/jitender-saini.svg?style=flat-square)](http://hits.dwyl.com/jitender-saini/jitender-saini/jitender-saini.svg?style=flat-square)`;


const content = `${introTitle}\n
${introDescription}\n
${badges}\n

${gif}\n
${factsTitle}\n
${facts}\n

${toolsTitle}\n
<p align="left">\n
    ${tools}\n
</p>\n

${visitors}
`;

    const markdownContent = md.render(content);

    fs.writeFile('README.md', markdownContent, (err) => {
        if (err) {
            return console.error(err);
        }
        console.info(`Writing to README.md`);
    });


function generateBadge(badgeConfig) {
//[![LinkedIn](https://img.shields.io/badge/LinkedIn-@saaaini-0077B5?style=for-the-badge&logo=LinkedIn)](https://www.linkedin.com/in/saaaini/)
//https://img.shields.io/badge/-jitender--saini.github.io-4E69C8?style=for-the-badge&logo=Firefox
//https://img.shields.io/badge/-jitender--saini.github.io?style=flat-square&labelColor=4E69C8&logo=Firefox&link=https://jitender-saini.github.io
    badge = `[![${badgeConfig.name}](https://img.shields.io/badge/-${badgeConfig.badgeText}-${badgeConfig.logoBgColor}?style=for-the-badge&logo=${badgeConfig.logo}&link=${badgeConfig.link})](${badgeConfig.link})`
//    console.log(badge)
    return badge
}

function generateIcon(iconConfig, toolsIconSize) {
    return `<img src="${iconConfig.src}" alt="${iconConfig.alt}" width="auto" height="40" />`;
}

function generateTitle(size, title) {
    return `${'#'.repeat(size)} ${title}`;
}

function generateLink(label, link) {
    return `[${label}](${link})`;
}
