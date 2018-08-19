'use strict';

Controllers.controller('InfoCtrl', ['$scope', '$location', 'API',
    function ($scope, $location, API) {
            
            $scope.equalsHash = function equalsHash(term) {
                var result = $location.$$hash !== "" ? term === $location.$$hash.toLowerCase() : false;
                return result;
            };
            $scope.selectTopic = function selectTopic(topics, index) {
                angular.forEach(topics, function (topic, i) {
                    topic.selected = i === index ? true : false;
                    if (topic.subTopics !== null) {
                        angular.forEach(topic.subTopics, function (subTopic, i) {
                            subTopic.selected = false;
                        });
                    }
                });
            };
            $scope.deselectParentTopics = function deselectParentTopics(topics) {
                angular.forEach(topics, function (topic, i) {
                    topic.selected = false;
                });
            };
            $scope.topicOrSubTopicSelected = function topicOrSubTopicSelected(topic) {
                var selected = topic.selected;
                if (topic.subTopics !== null) {
                    angular.forEach(topic.subTopics, function (subTopic) {
                        if (subTopic.selected) {
                            selected = true;
                        }
                    });
                }
                return selected;
            };
            $scope.topicButNotSubTopicSelected = function topicButNotSubTopicSelected(topic) {
                var selected = topic.selected;
                if (topic.subTopics !== null) {
                    angular.forEach(topic.subTopics, function (subTopic) {
                        if (!subTopic.selected) {
                            selected = false;
                        }
                    });
                }
                return selected;
            };
            $scope.topics = [
                    { name: 'Author', selected: $scope.equalsHash('author'), content: 'Author', subTopics: [
                    {
                        name: 'Contact Information', selected: true, content: '<p>Bily Bourgeois\
                                                                                        <ul>\
                                                                                            <li>Phone Number: <a href="tel:1-406-868-5455">1-406-868-5455</a></li>\
                                                                                            <li>Email: <a href="mailto:billy.j.bourgeois@gmail.com?Subject=Request%20for%20more%20Information">billy.j.bourgeois@gmail.com</a></li>\
                                                                                        </ul> </p>', subTopics: null
                    },
                    { name: 'Experience', selected: false, content: 'Billy has 7 years of experience developing web applications.', subTopics: [
                        { name: 'Front End', selected: false,
                            content: '.',
                            subTopics: null
                        },
                        { name: 'Back End',
                            selected: false,
                            content: '.',
                            subTopics: null }
                    ]
                    },
                ]
                },
                { name: 'App', selected: $scope.equalsHash('app'), content: '', subTopics: [
                    { name: 'Technologies', selected: true, content: '.', subTopics: [
                        { name: '.', selected: false, content: 'You .', subTopics: null },
                        { name: '.', selected: false, content: '.', subTopics: null },
                        { name: '.', selected: false, content: '.', subTopics: null },
                        { name: 'MetaData', selected: true, content: ' <a target="_blank" href="' + API.baseUrl + '$metadata">View MetaData</a>', subTopics: null }
                    ]
                    },
                    { name: '.', selected: false, content: '.', subTopics: null },
                    { name: '.', selected: false, content: '.', subTopics: null }
                ]
                },
                //{ name: 'FAQ', selected: $scope.equalsHash('faq'), content: 'Frequently Asked Questions', subTopics: [
                //    { name: 'What is a Task?', selected: true, content: 'The smallest identifiable and essential piece of a job that serves as a unit of work, and as a means of differentiating between the various components of a project.', subTopics: null },
                //    { name: 'What is a Sub-Task?', selected: false, content: 'A task that part of a larger task, which shares a related task number.', subTopics: null },
                //    { name: 'What is an Assignment', selected: false, content: 'A piece of work assigned to someone as part of a task.', subTopics: null },
                //    { name: "What does it mean to 'Act As'?", selected: false, content: "To do work on someone else's behalf. i.e. Create tasks, complete assignments, run reports, etc..", subTopics: null },
                //    { name: "What is a 'Project' in E-STARS?", selected: false, content: "A Project is the way E-STARS separates related tasks from all other the tasks", subTopics: null },
                //    { name: 'What are Roles?', selected: false, content: 'The label applied to a step, on a task, that is specific to a project. That label can refer to a position, function, or action for the assignee to do.', subTopics: null }
                //]
                //},
                //{ name: 'Developer Resources', selected: $scope.equalsHash('developer resources'), content: 'Developer Resources', subTopics: [
                //    { name: 'MetaData', selected: true, content: ' <a target="_blank" href="' + API.baseUrl + '$metadata">View MetaData</a>', subTopics: null },
                //    { name: 'Contributors', selected: false, content: '<label>Project Manager:</label><span> Marc Wagner</span><br />\
                //                                                        <label>Developer:</label><span> Billy Bourgeois</span><br />\
                //                                                        <label>Developer:</label><span> Erik Brobyn</span><br />\
                //                                                        <label>Developer:</label><span> Mark Cain</span><br />', subTopics: null
                //    }
                //]
                //}
            ];
    }]);